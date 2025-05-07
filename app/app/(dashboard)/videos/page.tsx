// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Search, Play, Download, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "react-toastify";
// import { getUserId } from "@/lib/authenticate";
// import { useRouter } from "next/navigation";

// type VideoType = {
//   id: string;
//   name: string; // Changed from filename to match API response
//   videoData: string; // Base64 video data from API
//   videoUrl: string; // URL created from videoData
//   duration: string;
//   createdAt: string; // Changed from date to match API response
//   userIdentifier?: string;
//   audioId?: string;
// };

// export default function MyVideosPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("newest");
//   const [videos, setVideos] = useState<VideoType[]>([]);
//   const [openVideo, setOpenVideo] = useState<VideoType | null>(null);
//   const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
//   const router = useRouter();

//   useEffect(() => {
//     const retrieveVideos = async () => {
//       try {
//         const userIdentifier = await getUserId();
//         if (!userIdentifier) {
//           toast.error("Please log in to view your videos", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "colored",
//           });
//           router.push("/login");
//           return;
//         }

//         console.log(`Fetching videos for userIdentifier: ${userIdentifier}`);
//         const response = await fetch(
//           `/api/videos?metadata=true${userIdentifier ? `&email=${encodeURIComponent(userIdentifier)}` : ''}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
//             },
//             credentials: "include",
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Videos fetched:", data);

//           // Map API response to VideoType, converting base64 videoData to URLs
//           const formattedVideos = data.videos.map((video: any) => {
//             try {
//               const videoBuffer = Buffer.from(video.videoData, "base64");
//               const videoBlob = new Blob([videoBuffer], { type: "video/mp4" });
//               const videoUrl = URL.createObjectURL(videoBlob);
//               return {
//                 id: video._id,
//                 name: video.name || `Video-${video._id}`,
//                 videoData: video.videoData,
//                 videoUrl,
//                 duration: "00:00", // Will be calculated later
//                 createdAt: video.createdAt,
//                 userIdentifier: video.userIdentifier,
//                 audioId: video.audioId,
//               };
//             } catch (error) {
//               console.error(`Failed to create Blob URL for video ${video._id}:`, error);
//               return {
//                 id: video._id,
//                 name: video.name || `Video-${video._id}`,
//                 videoData: video.videoData,
//                 videoUrl: "/placeholder-video.mp4",
//                 duration: "00:00",
//                 createdAt: video.createdAt,
//                 userIdentifier: video.userIdentifier,
//                 audioId: video.audioId,
//               };
//             }
//           });
//           setVideos(formattedVideos);
//         } else {
//           console.error("Failed to fetch videos:", response.status, await response.text());
//           toast.error("Failed to fetch videos");
//         }
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         toast.error("An error occurred while fetching videos");
//       }
//     };
//     retrieveVideos();
//   }, [router]);

//   const handleDownload = (videoUrl: string, name: string) => {
//     const link = document.createElement("a");
//     link.href = videoUrl;
//     link.download = `${name}.mp4`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const userIdentifier = await getUserId();
//       if (!userIdentifier) {
//         toast.error("Please log in to delete videos");
//         return;
//       }

//       const response = await fetch("/api/videos", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         body: JSON.stringify({ id }),
//         credentials: "include",
//       });
//       if (response.ok) {
//         setVideos((prev) => prev.filter((video) => video.id !== id));
//         toast.success("Video deleted successfully");
//       } else {
//         toast.error("Failed to delete video");
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error);
//       toast.error("An error occurred while deleting video");
//     }
//   };

//   const calculateDuration = async (videoEl: HTMLVideoElement, videoId: string) => {
//     try {
//       const duration = await new Promise<string>((resolve) => {
//         videoEl.onloadedmetadata = () => {
//           const minutes = Math.floor(videoEl.duration / 60);
//           const seconds = Math.floor(videoEl.duration % 60);
//           resolve(
//             `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
//           );
//         };
//         videoEl.onerror = () => resolve("00:00");
//       });
//       setVideos((prev) =>
//         prev.map((v) => (v.id === videoId ? { ...v, duration } : v))
//       );
//     } catch (error) {
//       console.error(`Error calculating duration for video ${videoId}:`, error);
//       setVideos((prev) =>
//         prev.map((v) => (v.id === videoId ? { ...v, duration: "00:00" } : v))
//       );
//     }
//   };

//   const filteredVideos = videos.filter((video) =>
//     video.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedVideos = [...filteredVideos].sort((a, b) => {
//     if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//     if (sortBy === "a-z") return a.name.localeCompare(b.name);
//     if (sortBy === "z-a") return b.name.localeCompare(a.name);
//     return 0;
//   });

//   return (
//     <div className="container mx-auto">
//       <div className="mb-6">
//         <h1 className="fontfamily text-3xl font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
//           My Videos
//         </h1>
//         <p className="text-muted-foreground">Manage your generated videos</p>
//       </div>

//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="relative flex-1 sm:max-w-sm">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search videos..."
//             className="pl-8 rounded-sm focus-visible:border-none focus:outline-none focus:ring-0"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger className="w-[180px] border-green-200 dark:border-green-800">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="newest">Newest First</SelectItem>
//               <SelectItem value="oldest">Oldest First</SelectItem>
//               <SelectItem value="a-z">A-Z</SelectItem>
//               <SelectItem value="z-a">Z-A</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="space-y-3">
//         {sortedVideos.length > 0 ? (
//           sortedVideos.map((video) => (
//             <div
//               key={video.id}
//               className="flex items-center gap-4 rounded-sm border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm"
//             >
//               <div className="relative h-25 w-36 overflow-hidden">
//                 <video
//                   ref={(el) => {
//                     if (el) videoRefs.current[video.id] = el;
//                   }}
//                   src={video.videoUrl}
//                   className="h-full w-full object-cover rounded-sm"
//                   muted
//                   onError={(e: any) =>
//                     console.error(`Video load error for ${video.id}:`, {
//                       message: e.target.error?.message,
//                       code: e.target.error?.code,
//                       src: video.videoUrl,
//                     })
//                   }
//                   onLoadedMetadata={() => calculateDuration(videoRefs.current[video.id]!, video.id)}
//                 />
//                 <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
//                   {video.duration}
//                 </div>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h3 className="font-medium text-green-800 dark:text-green-300">
//                   {video.name}
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <p className="text-xs text-muted-foreground mt-2">
//                     {new Date(video.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-1 mr-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setOpenVideo(video)}
//                   className="h-8 w-8 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
//                 >
//                   <Play className="h-4 w-4" />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleDownload(video.videoUrl, video.name)}
//                   className="h-8 w-8 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
//                 >
//                   <Download className="h-4 w-4" />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleDelete(video.id)}
//                   className="h-8 w-8 text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-900/30"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No videos found.</p>
//         )}
//       </div>

//       {openVideo && (
//         <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
//           <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
//             <video
//               src={openVideo.videoUrl}
//               controls
//               width={400}
//               height={400}
//               autoPlay
//               className="w-full h-full object-contain"
//               onError={(e: any) =>
//                 console.error(`Dialog video load error for ${openVideo.id}:`, {
//                   message: e.target.error?.message,
//                   code: e.target.error?.code,
//                   src: openVideo.videoUrl,
//                 })
//               }
//             />
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// }










"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Play, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { getUserId } from "@/lib/authenticate";
import { useRouter } from "next/navigation";

type VideoType = {
  id: string;
  name: string;
  videoData: string;
  videoUrl: string;
  duration: string;
  createdAt: string;
  userIdentifier?: string;
  audioId?: string;
};

export default function MyVideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [openVideo, setOpenVideo] = useState<VideoType | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const router = useRouter();

  useEffect(() => {
    const retrieveVideos = async () => {
      try {
        const userIdentifier = await getUserId();
        if (!userIdentifier) {
          toast.error("Please log in to view your videos", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
          router.push("/login");
          return;
        }

        const response = await fetch(
          `/api/videos?metadata=true${userIdentifier ? `&email=${encodeURIComponent(userIdentifier)}` : ''}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const formattedVideos = data.videos.map((video: any) => {
            try {
              const videoBuffer = Buffer.from(video.videoData, "base64");
              const videoBlob = new Blob([videoBuffer], { type: "video/mp4" });
              const videoUrl = URL.createObjectURL(videoBlob);
              return {
                id: video._id,
                name: video.name || `Video-${video._id}`,
                videoData: video.videoData,
                videoUrl,
                duration: "00:00",
                createdAt: video.createdAt,
                userIdentifier: video.userIdentifier,
                audioId: video.audioId,
              };
            } catch (error) {
              console.error(`Failed to create Blob URL for video ${video._id}:`, error);
              return {
                id: video._id,
                name: video.name || `Video-${video._id}`,
                videoData: video.videoData,
                videoUrl: "/placeholder-video.mp4",
                duration: "00:00",
                createdAt: video.createdAt,
                userIdentifier: video.userIdentifier,
                audioId: video.audioId,
              };
            }
          });
          setVideos(formattedVideos);
        } else {
          toast.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("An error occurred while fetching videos");
      }
    };
    retrieveVideos();
  }, [router]);

  const handleDownload = (videoUrl: string, name: string) => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `${name}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string) => {
    try {
      const userIdentifier = await getUserId();
      if (!userIdentifier) {
        toast.error("Please log in to delete videos");
        return;
      }

      const response = await fetch("/api/videos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      });
      if (response.ok) {
        setVideos((prev) => prev.filter((video) => video.id !== id));
        toast.success("Video deleted successfully");
      } else {
        toast.error("Failed to delete video");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("An error occurred while deleting video");
    }
  };

  const calculateDuration = async (videoEl: HTMLVideoElement, videoId: string) => {
    try {
      const duration = await new Promise<string>((resolve) => {
        videoEl.onloadedmetadata = () => {
          const minutes = Math.floor(videoEl.duration / 60);
          const seconds = Math.floor(videoEl.duration % 60);
          resolve(
            `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        };
        videoEl.onerror = () => resolve("00:00");
      });
      setVideos((prev) =>
        prev.map((v) => (v.id === videoId ? { ...v, duration } : v))
      );
    } catch (error) {
      setVideos((prev) =>
        prev.map((v) => (v.id === videoId ? { ...v, duration: "00:00" } : v))
      );
    }
  };

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "a-z") return a.name.localeCompare(b.name);
    if (sortBy === "z-a") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="fontfamily text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Videos
        </h1>
        <p className="text-muted-foreground">Manage your generated videos</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            className="pl-8 rounded-sm focus-visible:border-none focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-blue-200 dark:border-indigo-800">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {sortedVideos.length > 0 ? (
          sortedVideos.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-4 rounded-sm border border-blue-200 dark:border-indigo-800 hover:bg-blue-50 dark:hover:bg-indigo-900/20 transition-colors shadow-sm"
            >
              <div className="relative h-25 w-36 overflow-hidden">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[video.id] = el;
                  }}
                  src={video.videoUrl}
                  className="h-full w-full object-cover rounded-sm"
                  muted
                  onError={(e: any) =>
                    console.error(`Video load error for ${video.id}:`, {
                      message: e.target.error?.message,
                      code: e.target.error?.code,
                      src: video.videoUrl,
                    })
                  }
                  onLoadedMetadata={() => calculateDuration(videoRefs.current[video.id]!, video.id)}
                />
                <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
                  {video.duration}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-blue-800 dark:text-indigo-300">
                  {video.name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mr-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenVideo(video)}
                  className="h-8 w-8 text-blue-600 dark:text-indigo-400 hover:bg-blue-100 dark:hover:bg-indigo-900/30"
                >
                  <Play className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(video.videoUrl, video.name)}
                  className="h-8 w-8 text-blue-600 dark:text-indigo-400 hover:bg-blue-100 dark:hover:bg-indigo-900/30"
                >
                  <Download className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(video.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No videos found.</p>
        )}
      </div>

      {openVideo && (
        <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
          <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
            <video
              src={openVideo.videoUrl}
              controls
              width={400}
              height={400}
              autoPlay
              className="w-full h-full object-contain"
              onError={(e: any) =>
                console.error(`Dialog video load error for ${openVideo.id}:`, {
                  message: e.target.error?.message,
                  code: e.target.error?.code,
                  src: openVideo.videoUrl,
                })
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
