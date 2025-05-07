
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const videoOutputSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  filename: String,
  uploadDate: { type: Date, default: Date.now },
  videoData: Buffer,
  templateId: String,
  status: { type: String, default: "processing", enum: ["processing", "completed", "failed"] },
  userIdentifier: String,
  audioId: String,
  createdAt: { type: Date, default: Date.now },
});

const VideoOutput = mongoose.models.VideoOutput || mongoose.model("VideoOutput", videoOutputSchema);
export default VideoOutput;
