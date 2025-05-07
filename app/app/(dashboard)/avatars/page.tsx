
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { getUserId } from "@/lib/authenticate";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Play, Pause, Check, Loader2 } from "lucide-react";

// export default function VideoAvatarsPage() {
//   const [avatars, setAvatars] = useState([]);
//   const [userAvatars, setUserAvatars] = useState([]);
//   const [selectedAvatarId, setSelectedAvatarId] = useState("");
//   const [playingVideo, setPlayingVideo] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const videoRefs = useRef({});
//   const userId = getUserId();
//   const router = useRouter();

//   useEffect(() => {
//     if (!userId) {
//       toast.info("Please sign in to continue.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//       router.push("/login");
//       return;
//     }

//     const startTime = performance.now();
//     setIsLoading(true);

//     Promise.all([
//       fetch(`/api/video/templates?userIdentifier=${userId}`, {
//         headers: { "Authorization": `Bearer ${localStorage.getItem("token") || ""}` },
//       }),
//       fetch(`/api/user-avatars?userIdentifier=${userId}`, {
//         headers: { "Authorization": `Bearer ${localStorage.getItem("token") || ""}` },
//       }),
//     ])
//       .then(([defaultRes, userRes]) => Promise.all([defaultRes.json(), userRes.json()]))
//       .then(([defaultData, userAvatars]) => {
//         const formattedDefaultAvatars = defaultData.templates.map((avatar: { id: any; title: any; videoPath: any }) => ({
//           id: avatar.id,
//           name: avatar.title,
//           video: avatar.videoPath,
//           type: "default",
//         }));
//         const formattedUserAvatars = userAvatars.map((avatar: { id: any; name: any; gender: any; video: any }) => ({
//           id: avatar.id,
//           name: avatar.name,
//           gender: avatar.gender,
//           video: avatar.video,
//           type: "uploaded",
//         }));
//         setAvatars(formattedDefaultAvatars);
//         setUserAvatars(formattedUserAvatars);
//         const endTime = performance.now();
//         console.log(`Fetch completed in ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
//       })
//       .catch((error) => {
//         console.error("Error fetching avatars:", error);
//         toast.error("Failed to load avatars");
//       })
//       .finally(() => setIsLoading(false));
//   }, [userId, router]);

//   const toggleVideo = (id: string | number) => {
//     const video = videoRefs.current[id];
//     if (video) {
//       if (video.paused) {
//         video.muted = false; // Unmute when playing
//         video.play();
//         setPlayingVideo((prev) => ({ ...prev, [id]: true }));
//       } else {
//         video.pause();
//         setPlayingVideo((prev) => ({ ...prev, [id]: false }));
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 min-h-screen bg-white">
//       <div className="mb-6">
//         <h1 className="text-3xl font-semibold text-blue-600">Available Avatars</h1>
//         <p className="text-blue-500 text-sm"></p>
//       </div>

//       <div className="max-w-4xl mx-auto">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//           </div>
//         ) : (
//           <>
//             {/* Default Avatars */}
//             <div className="mb-8">
//               <h2 className="text-xl font-medium text-blue-800">Default Avatars</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {avatars.map((avatar) => (
//                   <Card
//                     key={avatar.id}
//                     onClick={() => setSelectedAvatarId(avatar.id)}
//                     className={`p-0 rounded-sm overflow-hidden cursor-pointer transition-all hover:shadow-md
//                       ${
//                         selectedAvatarId === avatar.id
//                           ? "border-blue-500 ring-2 ring-blue-500"
//                           : "border-blue-200"
//                       }`}
//                   >
//                     <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50">
//                       <video
//                         ref={(el) => {
//                           if (el) videoRefs.current[avatar.id] = el;
//                         }}
//                         src={`data:video/mp4;base64,${avatar.video}`}
//                         preload={selectedAvatarId === avatar.id ? "metadata" : "none"}
//                         // muted removed, will be controlled by toggleVideo
//                         loop
//                         autoPlay={selectedAvatarId === avatar.id}
//                         onError={(e) =>
//                           console.error(`Video load error for avatar ${avatar.id}:`, e)
//                         }
//                         className="w-full h-full object-cover"
//                       />
//                       <Button
//                         variant="secondary"
//                         size="icon"
//                         className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleVideo(avatar.id);
//                         }}
//                       >
//                         {playingVideo[avatar.id] ? (
//                           <Pause className="h-5 w-5 text-blue-600" />
//                         ) : (
//                           <Play className="h-5 w-5 text-blue-600" />
//                         )}
//                       </Button>
//                     </div>
//                     <CardContent className="p-3">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="font-medium text-blue-800">{avatar.name}</p>
//                         </div>
//                         {selectedAvatarId === avatar.id && (
//                           <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
//                             <Check className="h-3 w-3 text-white" />
//                           </div>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             {/* User-Uploaded Avatars (Only if exists) */}
//             {userAvatars.length > 0 && (
//               <div className="mb-8">
//                 <h2 className="text-xl font-medium text-blue-800">Your Avatars</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   {userAvatars.map((avatar) => (
//                     <Card
//                       key={avatar.id}
//                       onClick={() => setSelectedAvatarId(avatar.id)}
//                       className={`p-0 rounded-sm overflow-hidden cursor-pointer transition-all hover:shadow-md
//                         ${
//                           selectedAvatarId === avatar.id
//                             ? "border-blue-500 ring-2 ring-blue-500"
//                             : "border-blue-200"
//                         }`}
//                     >
//                       <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50">
//                         <video
//                           ref={(el) => {
//                             if (el) videoRefs.current[avatar.id] = el;
//                           }}
//                           src={avatar.video}
//                           preload={selectedAvatarId === avatar.id ? "metadata" : "none"}
//                           // muted removed, will be controlled by toggleVideo
//                           loop
//                           autoPlay={selectedAvatarId === avatar.id}
//                           onError={(e) =>
//                             console.error(`Video load error for avatar ${avatar.id}:`, e)
//                           }
//                           className="w-full h-full object-cover"
//                         />
//                         <Button
//                           variant="secondary"
//                           size="icon"
//                           className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleVideo(avatar.id);
//                           }}
//                         >
//                           {playingVideo[avatar.id] ? (
//                             <Pause className="h-5 w-5 text-blue-600" />
//                           ) : (
//                             <Play className="h-5 w-5 text-blue-600" />
//                           )}
//                         </Button>
//                       </div>
//                       <CardContent className="p-3">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium text-blue-800">{avatar.name}</p>
//                           </div>
//                           {selectedAvatarId === avatar.id && (
//                             <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
//                               <Check className="h-3 w-3 text-white" />
//                             </div>
//                           )}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }














// "use client"

// import type React from "react"

// import { useState, useEffect, useRef } from "react"
// import { getUserId } from "@/lib/authenticate"
// import { useRouter } from "next/navigation"
// import { toast } from "react-toastify"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Play, Pause, Check, Loader2, Video, User, Upload, Info, ChevronRight } from "lucide-react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"

// export default function VideoAvatarsPage() {
//   const [avatars, setAvatars] = useState([])
//   const [userAvatars, setUserAvatars] = useState([])
//   const [selectedAvatarId, setSelectedAvatarId] = useState("")
//   const [playingVideo, setPlayingVideo] = useState({})
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("default")
//   const [hoveredAvatarId, setHoveredAvatarId] = useState(null)
//   const videoRefs = useRef({})
//   const userId = getUserId()
//   const router = useRouter()

//   useEffect(() => {
//     if (!userId) {
//       toast.info("Please sign in to continue.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       })
//       router.push("/login")
//       return
//     }

//     const startTime = performance.now()
//     setIsLoading(true)

//     Promise.all([
//       fetch(`/api/video/templates?userIdentifier=${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
//       }),
//       fetch(`/api/user-avatars?userIdentifier=${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
//       }),
//     ])
//       .then(([defaultRes, userRes]) => Promise.all([defaultRes.json(), userRes.json()]))
//       .then(([defaultData, userAvatars]) => {
//         const formattedDefaultAvatars = defaultData.templates.map(
//           (avatar: { id: any; title: any; videoPath: any }) => ({
//             id: avatar.id,
//             name: avatar.title,
//             video: avatar.videoPath,
//             type: "default",
//           }),
//         )
//         const formattedUserAvatars = userAvatars.map((avatar: { id: any; name: any; gender: any; video: any }) => ({
//           id: avatar.id,
//           name: avatar.name,
//           gender: avatar.gender,
//           video: avatar.video,
//           type: "uploaded",
//         }))
//         setAvatars(formattedDefaultAvatars)
//         setUserAvatars(formattedUserAvatars)

//         // Set active tab to user avatars if they exist
//         if (formattedUserAvatars.length > 0) {
//           setActiveTab("user")
//         }

//         const endTime = performance.now()
//         console.log(`Fetch completed in ${((endTime - startTime) / 1000).toFixed(2)} seconds`)
//       })
//       .catch((error) => {
//         console.error("Error fetching avatars:", error)
//         toast.error("Failed to load avatars")
//       })
//       .finally(() => setIsLoading(false))
//   }, [userId, router])

//   const toggleVideo = (id: string | number, e?: React.MouseEvent) => {
//     if (e) {
//       e.stopPropagation()
//     }

//     const video = videoRefs.current[id]
//     if (video) {
//       if (video.paused) {
//         // Pause all other videos first
//         Object.entries(videoRefs.current).forEach(([videoId, videoEl]: [string, any]) => {
//           if (videoId !== id.toString() && !videoEl.paused) {
//             videoEl.pause()
//             setPlayingVideo((prev) => ({ ...prev, [videoId]: false }))
//           }
//         })

//         video.muted = false // Unmute when playing
//         video
//           .play()
//           .then(() => {
//             setPlayingVideo((prev) => ({ ...prev, [id]: true }))
//           })
//           .catch((err) => {
//             console.error("Error playing video:", err)
//             toast.error("Failed to play video preview")
//           })
//       } else {
//         video.pause()
//         setPlayingVideo((prev) => ({ ...prev, [id]: false }))
//       }
//     }
//   }

//   const handleAvatarSelect = (id: string) => {
//     setSelectedAvatarId(id)

//     // Auto-play the selected avatar's video
//     const video = videoRefs.current[id]
//     if (video && video.paused) {
//       toggleVideo(id)
//     }
//   }

//   const getAvatarList = (avatarList, type) => {
//     if (avatarList.length === 0) {
//       return (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
//           <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed border-blue-200">
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <Video className="h-12 w-12 text-blue-300 mb-3" />
//               <h3 className="text-xl font-medium text-blue-800">
//                 {type === "default" ? "No Default Avatars" : "No Custom Avatars"}
//               </h3>
//               <p className="text-blue-600/70 text-center mt-2 max-w-md">
//                 {type === "default"
//                   ? "There are currently no default avatars available. Please check back later."
//                   : "You haven't uploaded any custom avatars yet."}
//               </p>
//               {type === "user" && (
//                 <Link href="/upload-avatar" className="mt-6">
//                   <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
//                     <Upload className="h-4 w-4 mr-2" />
//                     Record an Avatar
//                   </Button>
//                 </Link>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {avatarList.map((avatar, index) => {
//           const isSelected = selectedAvatarId === avatar.id
//           const isPlaying = playingVideo[avatar.id]
//           const isHovered = hoveredAvatarId === avatar.id
//           const delay = index * 0.05

//           return (
//             <motion.div
//               key={avatar.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay }}
//               onMouseEnter={() => setHoveredAvatarId(avatar.id)}
//               onMouseLeave={() => setHoveredAvatarId(null)}
//             >
//               <Card
//                 onClick={() => handleAvatarSelect(avatar.id)}
//                 className={`p-0 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg
//                   ${
//                     isSelected
//                       ? "border-blue-500 ring-2 ring-blue-500 shadow-md shadow-blue-100"
//                       : "border-blue-100 hover:border-blue-300"
//                   }`}
//               >
//                 <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
//                   <video
//                     ref={(el) => {
//                       if (el) videoRefs.current[avatar.id] = el
//                     }}
//                     src={avatar.type === "default" ? `data:video/mp4;base64,${avatar.video}` : avatar.video}
//                     preload={isSelected || isHovered ? "metadata" : "none"}
//                     loop
//                     autoPlay={isSelected}
//                     onError={(e) => console.error(`Video load error for avatar ${avatar.id}:`, e)}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* Play/Pause Button */}
//                   <AnimatePresence>
//                     {(isHovered || isPlaying) && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <Button
//                           variant="secondary"
//                           size="icon"
//                           className={`absolute bottom-3 left-3 h-10 w-10 rounded-full 
//                             ${
//                               isPlaying
//                                 ? "bg-blue-600 text-white hover:bg-blue-700"
//                                 : "bg-white/90 hover:bg-white text-blue-600"
//                             } 
//                             shadow-md`}
//                           onClick={(e) => toggleVideo(avatar.id, e)}
//                         >
//                           {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
//                         </Button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* Selection Indicator */}
//                   {isSelected && (
//                     <div className="absolute top-3 right-3 z-10">
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
//                       >
//                         <Check className="h-3.5 w-3.5 text-white" />
//                       </motion.div>
//                     </div>
//                   )}

//                   {/* Playing Indicator */}
//                   {isPlaying && (
//                     <div className="absolute bottom-3 right-3 flex gap-1">
//                       {[1, 2, 3].map((i) => (
//                         <motion.div
//                           key={i}
//                           className="w-1 h-4 bg-blue-500 rounded-full"
//                           animate={{
//                             height: [4, 12, 4],
//                           }}
//                           transition={{
//                             duration: 0.8,
//                             repeat: Number.POSITIVE_INFINITY,
//                             delay: i * 0.1,
//                           }}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {/* Hover Overlay */}
//                   <AnimatePresence>
//                     {isHovered && !isPlaying && (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"
//                       />
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <CardContent className="p-3">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium text-blue-800 truncate">{avatar.name}</p>
//                       {avatar.gender && <p className="text-xs text-blue-500">{avatar.gender}</p>}
//                     </div>
//                     {avatar.type === "uploaded" && (
//                       <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-600">
//                         Custom
//                       </Badge>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )
//         })}
//       </div>
//     )
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <h2 className="text-xl font-medium text-gray-800">Loading avatars...</h2>
//           <p className="text-blue-600/70 mt-2">Please wait while we prepare your video avatars</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pb-12">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-8">
//             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <h1 className="text-3xl font-semibold text-blue-600">
//                 Video Avatars
//               </h1>
//             </motion.div>
//           </div>

//           <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
//             <div className="flex justify-center mb-6">
//               <TabsList >
//                 <TabsTrigger
//                   value="default"
//                   className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
//                 >
//                   <Video className="h-4 w-4 mr-2" />
//                   Default Avatars
//                 </TabsTrigger>
//                 <TabsTrigger value="user" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
//                   <User className="h-4 w-4 mr-2" />
//                   Your Avatars
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <TabsContent value="default" className="mt-0">
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-blue-800">Default Avatars</h2>
//                   <p className="text-blue-600/70">Choose from our pre-made video avatars</p>
//                 </div>
//                 <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//                   <Video className="h-3.5 w-3.5 mr-1" />
//                   {avatars.length} Avatars
//                 </Badge>
//               </div>

//               {getAvatarList(avatars, "default")}
//             </TabsContent>

//             <TabsContent value="user" className="mt-0">
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-blue-800">Your Avatars</h2>
//                   <p className="text-blue-600/70">Custom avatars you've uploaded</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
//                     <User className="h-3.5 w-3.5 mr-1" />
//                     {userAvatars.length} Avatars
//                   </Badge>
//                   <Link href="/upload-avatar">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
//                     >
//                       <Upload className="h-3.5 w-3.5 mr-1.5" />
//                       Upload New
//                     </Button>
//                   </Link>
//                 </div>
//               </div>

//               {getAvatarList(userAvatars, "user")}
//             </TabsContent>
//           </Tabs>

//           {selectedAvatarId && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="bg-blue-100 p-2 rounded-full mr-3">
//                   </div>
//                   <div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
//             <div className="flex items-start gap-3">
//               <div className="bg-blue-100 p-2 rounded-full shrink-0 mt-0.5">

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }







// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { getUserId } from "@/lib/authenticate"
// import { useRouter } from "next/navigation"
// import { toast } from "react-toastify"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Play, Pause, Check, Loader2, Video, User, Upload, Info } from "lucide-react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"

// export default function VideoAvatarsPage() {
//   const [avatars, setAvatars] = useState([])
//   const [userAvatars, setUserAvatars] = useState([])
//   const [selectedAvatarId, setSelectedAvatarId] = useState("")
//   const [playingVideo, setPlayingVideo] = useState({})
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("default")
//   const [hoveredAvatarId, setHoveredAvatarId] = useState(null)
//   const videoRefs = useRef({})
//   const userId = getUserId()
//   const router = useRouter()

//   useEffect(() => {
//     if (!userId) {
//       toast.info("Please sign in to continue.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       })
//       router.push("/login")
//       return
//     }

//     const startTime = performance.now()
//     setIsLoading(true)

//     Promise.all([
//       fetch(`/api/video/templates?userIdentifier=${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
//       }),
//       fetch(`/api/user-avatars?userIdentifier=${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
//       }),
//     ])
//       .then(([defaultRes, userRes]) => Promise.all([defaultRes.json(), userRes.json()]))
//       .then(([defaultData, userAvatars]) => {
//         const formattedDefaultAvatars = defaultData.templates.map(
//           (avatar: { id: any; title: any; videoPath: any }) => ({
//             id: avatar.id,
//             name: avatar.title,
//             video: avatar.videoPath,
//             type: "default",
//           }),
//         )
//         const formattedUserAvatars = userAvatars.map((avatar: { id: any; name: any; gender: any; video: any }) => ({
//           id: avatar.id,
//           name: avatar.name,
//           gender: avatar.gender,
//           video: avatar.video,
//           type: "uploaded",
//         }))
//         setAvatars(formattedDefaultAvatars)
//         setUserAvatars(formattedUserAvatars)

//         if (formattedUserAvatars.length > 0) {
//           setActiveTab("user")
//         }

//         const endTime = performance.now()
//         console.log(`Fetch completed in ${((endTime - startTime) / 1000).toFixed(2)} seconds`)
//       })
//       .catch((error) => {
//         console.error("Error fetching avatars:", error)
//         toast.error("Failed to load avatars")
//       })
//       .finally(() => setIsLoading(false))
//   }, [userId, router])

//   const toggleVideo = (id: string | number, e?: React.MouseEvent) => {
//     if (e) {
//       e.stopPropagation()
//     }

//     const video = videoRefs.current[id]
//     if (video) {
//       if (video.paused) {
//         Object.entries(videoRefs.current).forEach(([videoId, videoEl]: [string, any]) => {
//           if (videoId !== id.toString() && !videoEl.paused) {
//             videoEl.pause()
//             setPlayingVideo((prev) => ({ ...prev, [videoId]: false }))
//           }
//         })

//         video.muted = false
//         video
//           .play()
//           .then(() => {
//             setPlayingVideo((prev) => ({ ...prev, [id]: true }))
//           })
//           .catch((err) => {
//             console.error("Error playing video:", err)
//             toast.error("Failed to play video preview")
//           })
//       } else {
//         video.pause()
//         setPlayingVideo((prev) => ({ ...prev, [id]: false }))
//       }
//     }
//   }

//   const handleAvatarSelect = (id: string) => {
//     setSelectedAvatarId(id)
//     const video = videoRefs.current[id]
//     if (video && video.paused) {
//       toggleVideo(id)
//     }
//   }

//   const getAvatarList = (avatarList, type) => {
//     if (avatarList.length === 0) {
//       return (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
//           <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed border-indigo-200">
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <Video className="h-12 w-12 text-indigo-300 mb-3" />
//               <h3 className="text-xl font-medium text-indigo-800">
//                 {type === "default" ? "No Default Avatars" : "No Custom Avatars"}
//               </h3>
//               <p className="text-indigo-600/70 text-center mt-2 max-w-md">
//                 {type === "default"
//                   ? "There are currently no default avatars available. Please check back later."
//                   : "You haven't uploaded any custom avatars yet."}
//               </p>
//               {type === "user" && (
//                 <Link href="/upload-avatar" className="mt-6">
//                   <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
//                     <Upload className="h-4 w-4 mr-2" />
//                     Record an Avatar
//                   </Button>
//                 </Link>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       )
//     }

//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {avatarList.map((avatar, index) => {
//           const isSelected = selectedAvatarId === avatar.id
//           const isPlaying = playingVideo[avatar.id]
//           const isHovered = hoveredAvatarId === avatar.id
//           const delay = index * 0.05

//           return (
//             <motion.div
//               key={avatar.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay }}
//               onMouseEnter={() => setHoveredAvatarId(avatar.id)}
//               onMouseLeave={() => setHoveredAvatarId(null)}
//             >
//               <Card
//                 onClick={() => handleAvatarSelect(avatar.id)}
//                 className={`p-0 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg
//                   ${
//                     isSelected
//                       ? "border-indigo-500 ring-2 ring-indigo-500 shadow-md shadow-indigo-100"
//                       : "border-indigo-100 hover:border-indigo-300"
//                   }`}
//               >
//                 <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
//                   <video
//                     ref={(el) => {
//                       if (el) videoRefs.current[avatar.id] = el
//                     }}
//                     src={avatar.type === "default" ? `data:video/mp4;base64,${avatar.video}` : avatar.video}
//                     preload={isSelected || isHovered ? "metadata" : "none"}
//                     loop
//                     autoPlay={isSelected}
//                     onError={(e) => console.error(`Video load error for avatar ${avatar.id}:`, e)}
//                     className="w-full h-full object-cover"
//                   />

//                   <AnimatePresence>
//                     {(isHovered || isPlaying) && (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <Button
//                           variant="secondary"
//                           size="icon"
//                           className={`absolute bottom-3 left-3 h-10 w-10 rounded-full 
//                             ${
//                               isPlaying
//                                 ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
//                                 : "bg-white/90 hover:bg-white text-indigo-600"
//                             } 
//                             shadow-md`}
//                           onClick={(e) => toggleVideo(avatar.id, e)}
//                         >
//                           {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
//                         </Button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {isSelected && (
//                     <div className="absolute top-3 right-3 z-10">
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         className="h-6 w-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md"
//                       >
//                         <Check className="h-3.5 w-3.5 text-white" />
//                       </motion.div>
//                     </div>
//                   )}

//                   {isPlaying && (
//                     <div className="absolute bottom-3 right-3 flex gap-1">
//                       {[1, 2, 3].map((i) => (
//                         <motion.div
//                           key={i}
//                           className="w-1 h-4 bg-indigo-500 rounded-full"
//                           animate={{
//                             height: [4, 12, 4],
//                           }}
//                           transition={{
//                             duration: 0.8,
//                             repeat: Number.POSITIVE_INFINITY,
//                             delay: i * 0.1,
//                           }}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   <AnimatePresence>
//                     {isHovered && !isPlaying && (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent"
//                       />
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <CardContent className="p-3">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium text-indigo-800 truncate">{avatar.name}</p>
//                       {avatar.gender && <p className="text-xs text-indigo-500">{avatar.gender}</p>}
//                     </div>
//                     {avatar.type === "uploaded" && (
//                       <Badge variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-600">
//                         Custom
//                       </Badge>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )
//         })}
//       </div>
//     )
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
//           <h2 className="text-xl font-medium text-indigo-800">Loading avatars...</h2>
//           <p className="text-indigo-600/70 mt-2">Please wait while we prepare your video avatars</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 pb-12">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-8">
//             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <h1 className="text-3xl font-semibold text-indigo-600">Video Avatars</h1>
//             </motion.div>
//           </div>

//           <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
//             <div className="flex justify-center mb-6">
//               <TabsList className="bg-indigo-50">
//                 <TabsTrigger
//                   value="default"
//                   className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
//                 >
//                   <Video className="h-4 w-4 mr-2" />
//                   Default Avatars
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="user"
//                   className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
//                 >
//                   <User className="h-4 w-4 mr-2" />
//                   Your Avatars
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <TabsContent value="default" className="mt-0">
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-indigo-800">Default Avatars</h2>
//                   <p className="text-indigo-600/70">Choose from our pre-made video avatars</p>
//                 </div>
//                 <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
//                   <Video className="h-3.5 w-3.5 mr-1" />
//                   {avatars.length} Avatars
//                 </Badge>
//               </div>

//               {getAvatarList(avatars, "default")}
//             </TabsContent>

//             <TabsContent value="user" className="mt-0">
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-indigo-800">Your Avatars</h2>
//                   <p className="text-indigo-600/70">Custom avatars you've uploaded</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
//                     <User className="h-3.5 w-3.5 mr-1" />
//                     {userAvatars.length} Avatars
//                   </Badge>
//                 </div>
//               </div>

//               {getAvatarList(userAvatars, "user")}
//             </TabsContent>
//           </Tabs>

//           {selectedAvatarId && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           <div className="mt-8 p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg">
//             <div className="flex items-start gap-3">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full shrink-0 mt-0.5">
//                 <Info className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium text-indigo-800">Need Help?</h3>
//                 <p className="text-indigo-600/70">
//                   Learn how to create and manage your video avatars in our{" "}
//                   <Link href="/help&support" className="text-indigo-600 hover:underline">
//                     Help Center
//                   </Link>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }









"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { getUserId } from "@/lib/authenticate"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Video, User, Upload, Info, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoAvatarsPage() {
  const [avatars, setAvatars] = useState([])
  const [userAvatars, setUserAvatars] = useState([])
  const [playingVideo, setPlayingVideo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("default")
  const [hoveredAvatarId, setHoveredAvatarId] = useState(null)
  const videoRefs = useRef({})
  const userId = getUserId()
  const router = useRouter()

  useEffect(() => {
    if (!userId) {
      toast.info("Please sign in to continue.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      })
      router.push("/login")
      return
    }

    const startTime = performance.now()
    setIsLoading(true)

    Promise.all([
      fetch(`/api/video/templates?userIdentifier=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      }),
      fetch(`/api/user-avatars?userIdentifier=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      }),
    ])
      .then(([defaultRes, userRes]) => Promise.all([defaultRes.json(), userRes.json()]))
      .then(([defaultData, userAvatars]) => {
        const formattedDefaultAvatars = defaultData.templates.map(
          (avatar: { id: any; title: any; videoPath: any }) => ({
            id: avatar.id,
            name: avatar.title,
            video: avatar.videoPath,
            type: "default",
          }),
        )
        const formattedUserAvatars = userAvatars.map((avatar: { id: any; name: any; gender: any; video: any }) => ({
          id: avatar.id,
          name: avatar.name,
          gender: avatar.gender,
          video: avatar.video,
          type: "uploaded",
        }))
        setAvatars(formattedDefaultAvatars)
        setUserAvatars(formattedUserAvatars)

        // Log video sources for debugging
        console.log("Default avatars video sample:", formattedDefaultAvatars[0]?.video?.substring(0, 50))
        console.log("User avatars video sample:", formattedUserAvatars[0]?.video?.substring(0, 50))

        if (formattedUserAvatars.length > 0) {
          setActiveTab("user")
        }

        const endTime = performance.now()
        console.log(`Fetch completed in ${((endTime - startTime) / 1000).toFixed(2)} seconds`)
      })
      .catch((error) => {
        console.error("Error fetching avatars:", error)
        toast.error("Failed to load avatars")
      })
      .finally(() => setIsLoading(false))
  }, [userId, router])

  const toggleVideo = (id: string | number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }

    const video = videoRefs.current[id]
    if (video) {
      if (video.paused) {
        Object.entries(videoRefs.current).forEach(([videoId, videoEl]: [string, any]) => {
          if (videoId !== id.toString() && !videoEl.paused) {
            videoEl.pause()
            setPlayingVideo((prev) => ({ ...prev, [videoId]: false }))
          }
        })

        video.muted = false
        video
          .play()
          .then(() => {
            console.log(`Video with ID ${id} is now playing`)
            setPlayingVideo((prev) => ({ ...prev, [id]: true }))
          })
          .catch((err) => {
            console.error(`Error playing video with ID ${id}:`, err)
            toast.error(`Failed to play video: ${err.message}`)
          })
      } else {
        video.pause()
        console.log(`Video with ID ${id} is now paused`)
        setPlayingVideo((prev) => ({ ...prev, [id]: false }))
      }
    } else {
      console.error(`Video element for ID ${id} not found`)
      toast.error("Video element not found")
    }
  }

  const handleDeleteAvatar = async (id: string) => {
    try {
      const response = await fetch("/api/video/upload-avatar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      })

      if (response.ok) {
        setUserAvatars((prev) => prev.filter((avatar) => avatar.id !== id))
        toast.success("Avatar moved to trash")
      } else {
        toast.error("Failed to delete avatar")
      }
    } catch (error) {
      console.error("Error deleting avatar:", error)
      toast.error("An error occurred while deleting the avatar")
    }
  }

  const getAvatarList = (avatarList, type) => {
    if (avatarList.length === 0) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed border-indigo-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Video className="h-12 w-12 text-indigo-300 mb-3" />
              <h3 className="text-xl font-medium text-indigo-800">
                {type === "default" ? "No Default Avatars" : "No Custom Avatars"}
              </h3>
              <p className="text-indigo-600/70 text-center mt-2 max-w-md">
                {type === "default"
                  ? "There are currently no default avatars available. Please check back later."
                  : "You haven't uploaded any custom avatars yet."}
              </p>
              {type === "user" && (
                <Link href="/upload-avatar" className="mt-6">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Record an Avatar
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {avatarList.map((avatar, index) => {
          const isPlaying = playingVideo[avatar.id]
          const isHovered = hoveredAvatarId === avatar.id
          const delay = index * 0.05

          return (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay }}
              onMouseEnter={() => setHoveredAvatarId(avatar.id)}
              onMouseLeave={() => setHoveredAvatarId(null)}
            >
              <Card className="p-0 overflow-hidden transition-all duration-300 hover:shadow-lg border-indigo-100 hover:border-indigo-300">
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[avatar.id] = el
                    }}
                    src={
                      avatar.type === "default"
                        ? `data:video/mp4;base64,${avatar.video}`
                        : avatar.video
                    }
                    preload="metadata"
                    loop
                    onCanPlay={() => console.log(`Video ${avatar.id} can play`)}
                    onError={(e) => console.error(`Video load error for avatar ${avatar.id}:`, e)}
                    onClick={() => toggleVideo(avatar.id)} // Direct click on video for testing
                    className="w-full h-full object-cover"
                  />

                  <Button
                    variant="secondary"
                    size="icon"
                    className={`absolute bottom-3 left-3 h-10 w-10 rounded-full 
                      ${
                        isPlaying
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                          : "bg-white/90 hover:bg-white text-indigo-600"
                      } 
                      shadow-md`}
                    onClick={(e) => toggleVideo(avatar.id, e)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  {avatar.type === "uploaded" && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAvatar(avatar.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-indigo-800 truncate">{avatar.name}</p>
                      {avatar.gender && <p className="text-xs text-indigo-500">{avatar.gender}</p>}
                    </div>
                    {avatar.type === "uploaded" && (
                      <Badge variant="outline" className="text-xs bg-indigo-50 border-indigo-200 text-indigo-600">
                        Custom
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-indigo-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-indigo-800">Loading avatars...</h2>
          <p className="text-indigo-600/70 mt-2">Please wait while we prepare your video avatars</p>
        </div>
      </div>
    )
  }

  return (
    <div >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-semibold text-indigo-600">Video Avatars</h1>
            </motion.div>
          </div>

          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-6">
              <TabsList className="bg-indigo-50">
                <TabsTrigger
                  value="default"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Default Avatars
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Your Avatars
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="default" className="mt-0">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-800">Default Avatars</h2>
                  <p className="text-indigo-600/70">Choose from our pre-made video avatars</p>
                </div>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  <Video className="h-3.5 w-3.5 mr-1" />
                  {avatars.length} Avatars
                </Badge>
              </div>

              {getAvatarList(avatars, "default")}
            </TabsContent>

            <TabsContent value="user" className="mt-0">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-800">Your Avatars</h2>
                  <p className="text-indigo-600/70">Custom avatars you've uploaded</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    <User className="h-3.5 w-3.5 mr-1" />
                    {userAvatars.length} Avatars
                  </Badge>
                </div>
              </div>

              {getAvatarList(userAvatars, "user")}
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full shrink-0 mt-0.5">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-indigo-800">Need Help?</h3>
                <p className="text-indigo-600/70">
                  Learn how to create and manage your video avatars in our{" "}
                  <Link href="/help&support" className="text-indigo-600 hover:underline">
                    Help Center
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}