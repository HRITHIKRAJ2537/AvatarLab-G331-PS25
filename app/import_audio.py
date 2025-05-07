import os
import psycopg2
from psycopg2.extras import execute_values
import uuid
import subprocess
import shutil  # Added for directory cleanup
from typing import Dict

# Database configuration (update with your values)
DB_CONFIG = {
    "dbname": "avatarlab",
    "user": "postgres",
    "password": "newpassword",  # Replace with your password
    "host": "localhost",
    "port": "5432"
}

# Configuration for import
AUDIO_DIR = "/home/vvr/PROJECT/audios"  # Your audio directory
VIDEO_DIR = "/home/vvr/PROJECT/API/input_samples/sample_videos"  # Your video directory
# Manual mapping of audio files to normalized text
AUDIO_TEXT_MAPPING: Dict[str, str] = {
    "audio1.wav": "You ought to be ashamed of yourself, said Alice, a great girl like you, (she might well say this), to go on crying in this way!",
    "audio3.wav": "Just then she heard something splashing about in the pool a little way off, and she swam nearer to make out what it was: at first she thought it must be a walrus or hippopotamus, but then she remembered how small she was now, and she soon made out that it was only a mouse that had slipped in like herself.",
    "audio4.wav": "So she called softly after it, 'Mouse dear!",
    "audio5.wav": "Two monsters only were creating all this commotion; and before my eyes are two reptiles of the primitive world"
}

def get_video_duration(video_path: str) -> str:
    """Extract video duration using ffprobe."""
    try:
        result = subprocess.run([
            "ffprobe", "-i", video_path, "-show_entries", "format=duration",
            "-v", "quiet", "-of", "csv=p=0"
        ], capture_output=True, text=True)
        duration_sec = float(result.stdout.strip())
        minutes = int(duration_sec // 60)
        seconds = int(duration_sec % 60)
        return f"00:{minutes:02d}:{seconds:02d}"
    except (subprocess.CalledProcessError, ValueError) as e:
        print(f"Error getting duration for {video_path}: {str(e)}")
        return "00:30"

def generate_thumbnail(video_path: str, thumbnail_path: str):
    """Generate a thumbnail for the video using ffmpeg."""
    try:
        subprocess.run([
            "ffmpeg", "-i", video_path, "-vf", "thumbnail", "-frames:v", "1",
            "-s", "320x240", thumbnail_path, "-y"
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Thumbnail generated at: {thumbnail_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error generating thumbnail for {video_path}: {e.stderr.decode()}")
        raise

def import_audio(audio_dir: str, text_mapping: Dict[str, str], user_identifier: str = "user001"):
    """Import audio files and their normalized text into the Audio table."""
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()
    try:
        for filename, normalized_text in text_mapping.items():
            file_path = os.path.join(audio_dir, filename)
            if not os.path.exists(file_path):
                print(f"Skipping {filename}: File not found")
                continue
            if not filename.endswith(".wav"):
                print(f"Skipping {filename}: Not a .wav file")
                continue
            with open(file_path, 'rb') as f:
                audio_data = f.read()
            audio_id = f"audio_{uuid.uuid4().hex[:8]}"
            cursor.execute("""
                INSERT INTO "Audio" ("id", "userIdentifier", "text", "normalizedText", "audioPath", "audioBlob", "audioIndex", "createdAt", "updatedAt")
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                ON CONFLICT ("id") DO NOTHING
            """, (audio_id, user_identifier, normalized_text, normalized_text, f"/imported/audio/{audio_id}.wav", psycopg2.Binary(audio_data), 1))
            print(f"Imported audio: {filename} with ID: {audio_id}")
        conn.commit()
    except Exception as e:
        print(f"Error importing audio: {str(e)}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

def import_video(video_dir: str):
    """Import video files as templates into the Video table."""
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()
    try:
        for filename in os.listdir(video_dir):
            file_path = os.path.join(video_dir, filename)
            if not os.path.exists(file_path):
                print(f"Skipping {filename}: File not found")
                continue
            if not filename.endswith(".mp4"):
                print(f"Skipping {filename}: Not a .mp4 file")
                continue
            with open(file_path, 'rb') as f:
                video_data = f.read()
            video_id = f"video_{uuid.uuid4().hex[:8]}"
            temp_dir = "/tmp/import_temp"
            # Create or clear temp_dir for each video
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)  # Remove directory and all contents
            os.makedirs(temp_dir, exist_ok=True)
            temp_video_path = os.path.join(temp_dir, filename)
            thumbnail_path = os.path.join(temp_dir, f"{video_id}.jpg")

            with open(temp_video_path, 'wb') as f:
                f.write(video_data)
            generate_thumbnail(temp_video_path, thumbnail_path)

            with open(thumbnail_path, 'rb') as f:
                thumbnail_data = f.read()

            duration = get_video_duration(temp_video_path)
            cursor.execute("""
                INSERT INTO "Video" ("id", "userIdentifier", "title", "videoPath", "thumbnailPath", "isTemplate", "videoBlob", "status", "duration", "thumbnailBlob")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT ("id") DO NOTHING
            """, (video_id, "system", f"Template {filename.replace('.mp4', '')}", f"/imported/videos/{video_id}.mp4", f"/imported/thumbnails/{video_id}.jpg", True, psycopg2.Binary(video_data), "completed", duration, psycopg2.Binary(thumbnail_data)))
            print(f"Imported video: {filename} with ID: {video_id}")
            # Clean up
            shutil.rmtree(temp_dir)  # Remove directory and all contents
        conn.commit()
    except Exception as e:
        print(f"Error importing video: {str(e)}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    # Import audio
    if os.path.exists(AUDIO_DIR):
        import_audio(AUDIO_DIR, AUDIO_TEXT_MAPPING)
    else:
        print(f"Audio directory not found: {AUDIO_DIR}")

    # Import video
    if os.path.exists(VIDEO_DIR):
        import_video(VIDEO_DIR)
    else:
        print(f"Video directory not found: {VIDEO_DIR}")