
// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Maximize,
//   RotateCw,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   Send,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Slider } from "@/components/ui/slider";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { getUserId } from "@/lib/authenticate";

// type Avatar = { id: string; name: string; gender?: string; video: string; type: string };
// type Voice = { id: string; name: string; gender: string; audio: string; text: string };

// export default function WorkspacePage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [generateForm, setGenerateForm] = useState({
//     email: "",
//     text: "",
//     videoId: "",
//     audioId: "",
//     audio_text: "",
//   });
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [preview, setPreview] = useState("");
//   const [avatarTemplates, setAvatarTemplates] = useState<Avatar[]>([]);
//   const [userAvatars, setUserAvatars] = useState<Avatar[]>([]); // User-uploaded avatars
//   const [audioFiles, setAudioFiles] = useState<Voice[]>([]);
//   const [playingVideo, setPlayingVideo] = useState<Record<string, boolean>>({});
//   const [playingAudio, setPlayingAudio] = useState<Record<string, boolean>>({});
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [videoDuration, setVideoDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
//   const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
//   const previewVideoRef = useRef<HTMLVideoElement>(null);
//   const router = useRouter();
//   const userIdentifier = getUserId();

//   useEffect(() => {
//     const initializeState = () => {
//       const savedStep = localStorage.getItem("currentStep");
//       setCurrentStep(savedStep ? parseInt(savedStep, 10) : 1);
//       setGenerateForm({
//         ...generateForm,
//         text: localStorage.getItem("scriptText") || "",
//         videoId: localStorage.getItem("selectedTemplateId") || "",
//         audioId: localStorage.getItem("selectedAudioId") || "",
//       });
//       setPreview(localStorage.getItem("generatedVideoId") || "");
//     };

//     initializeState();

//     if (!userIdentifier) {
//       router.push("/login");
//       return;
//     }

//     fetch("/api/auth/verify", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok && response.status !== 404) {
//           localStorage.removeItem("token");
//           router.push("/login");
//         }
//       })
//       .catch((error) => console.error("Token verification error:", error));
//   }, [router, userIdentifier]);

//   useEffect(() => {
//     const loadImportedAudio = async () => {
//       try {
//         const response = await fetch("/api/audio/select", {
//           headers: { "Authorization": `Bearer ${localStorage.getItem("token") || ""}` },
//         });
//         const data = await response.json();
//         if (data.audioFiles) {
//           setAudioFiles(
//             data.audioFiles.map((audio: any) => ({
//               id: audio.id,
//               name: audio.name || `Voice ${audio.id}`,
//               gender: audio.gender || "Unknown",
//               audio: audio.path,
//               text: audio.normalizedText || "",
//             }))
//           );
//         } else {
//           toast.error("Failed to load imported audio");
//         }
//       } catch (error) {
//         console.error("Error loading imported audio:", error);
//         toast.error("Failed to load imported audio");
//       }
//     };

//     const loadTemplates = async () => {
//       try {
//         const response = await fetch("/api/video/templates", {
//           headers: { "Authorization": `Bearer ${localStorage.getItem("token") || ""}` },
//         });
//         const data = await response.json();
//         if (data.templates) {
//           const templatesWithUrls = data.templates.map((template: any) => {
//             try {
//               const videoBuffer = Buffer.from(template.videoPath, "base64");
//               const videoBlob = new Blob([videoBuffer], { type: "video/mp4" });
//               const videoUrl = URL.createObjectURL(videoBlob);
//               return {
//                 id: template.id,
//                 name: template.title,
//                 video: videoUrl,
//                 type: "default",
//               };
//             } catch (error) {
//               console.error(`Failed to create Blob URL for template ${template.id}:`, error);
//               return {
//                 id: template.id,
//                 name: template.title,
//                 video: "/placeholder-video.mp4",
//                 type: "default",
//               };
//             }
//           });
//           setAvatarTemplates(templatesWithUrls);
//         } else {
//           toast.error("Failed to load avatar templates");
//         }
//       } catch (error) {
//         console.error("Error loading templates:", error);
//         toast.error("Failed to load avatar templates");
//       }
//     };

//     const loadUserAvatars = async () => {
//       try {
//         const response = await fetch(`/api/user-avatars?userIdentifier=${userIdentifier}`, {
//           headers: { "Authorization": `Bearer ${localStorage.getItem("token") || ""}` },
//         });
//         const data = await response.json();
//         if (data) {
//           const formattedAvatars = data.map((avatar: any) => {
//             try {
//               const videoBlob = new Blob([Buffer.from(avatar.video.split(",")[1], "base64")], {
//                 type: "video/mp4",
//               });
//               const videoUrl = URL.createObjectURL(videoBlob);
//               return {
//                 id: avatar.id,
//                 name: avatar.name,
//                 gender: avatar.gender,
//                 video: videoUrl,
//                 type: avatar.type,
//               };
//             } catch (error) {
//               console.error(`Failed to create Blob URL for avatar ${avatar.id}:`, error);
//               return {
//                 id: avatar.id,
//                 name: avatar.name,
//                 gender: avatar.gender,
//                 video: "/placeholder-video.mp4",
//                 type: avatar.type,
//               };
//             }
//           });
//           setUserAvatars(formattedAvatars);
//         } else {
//           toast.error("Failed to load user avatars");
//         }
//       } catch (error) {
//         console.error("Error loading user avatars:", error);
//         toast.error("Failed to load user avatars");
//       }
//     };

//     loadImportedAudio();
//     loadTemplates();
//     if (userIdentifier) {
//       loadUserAvatars();
//     }
//   }, [userIdentifier]);

//   useEffect(() => {
//     const video = previewVideoRef.current;
//     if (!video) return;

//     const updateTime = () => setCurrentTime(video.currentTime);
//     video.addEventListener("timeupdate", updateTime);

//     return () => video.removeEventListener("timeupdate", updateTime);
//   }, [preview]);

//   const toggleVideo = (id: string) => {
//     const video = videoRefs.current[id];
//     if (video) {
//       if (video.paused) {
//         video.play();
//         setPlayingVideo((prev) => ({ ...prev, [id]: true }));
//       } else {
//         video.pause();
//         setPlayingVideo((prev) => ({ ...prev, [id]: false }));
//       }
//     }
//   };

//   const toggleAudio = (id: string) => {
//     const audio = audioRefs.current[id];
//     if (audio) {
//       if (audio.paused) {
//         Object.entries(audioRefs.current).forEach(([key, a]) => {
//           if (a && key !== id) {
//             a.pause();
//             setPlayingAudio((prev) => ({ ...prev, [key]: false }));
//           }
//         });
//         audio.play();
//         setPlayingAudio((prev) => ({ ...prev, [id]: true }));
//       } else {
//         audio.pause();
//         setPlayingAudio((prev) => ({ ...prev, [id]: false }));
//       }
//     }
//   };

//   const togglePreviewVideoPlay = () => {
//     const video = previewVideoRef.current;
//     if (!video) return;
//     if (isPlaying) {
//       video.pause();
//     } else {
//       video.play().catch((error) => console.error("Play failed:", error));
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const togglePreviewVideoMute = () => {
//     const video = previewVideoRef.current;
//     if (!video) return;
//     video.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   const handleNextStep = () => {
//     if (currentStep === 1 && generateForm.text.trim() !== "") {
//       setCurrentStep(2);
//       localStorage.setItem("currentStep", "2");
//       localStorage.setItem("scriptText", generateForm.text);
//     } else if (currentStep === 2 && generateForm.videoId !== "") {
//       setCurrentStep(3);
//       localStorage.setItem("currentStep", "3");
//       localStorage.setItem("selectedTemplateId", generateForm.videoId);
//     } else if (currentStep === 3 && generateForm.audioId !== "") {
//       handleGenerate();
//     } else {
//       toast.error("Please complete the current step before proceeding");
//     }
//   };

//   const handlePreviousStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//       localStorage.setItem("currentStep", (currentStep - 1).toString());
//     }
//   };

//   const handleGenerate = async () => {
//     if (!userIdentifier) {
//       toast.error("User identifier not found");
//       return;
//     }
//     setIsGenerating(true);
//     try {
//       const audioResponse = await fetch("/api/audio/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         body: JSON.stringify({
//           text: generateForm.text,
//           userIdentifier,
//           voiceId: generateForm.audioId,
//         }),
//       });

//       if (!audioResponse.ok) {
//         throw new Error("Failed to generate audio");
//       }

//       const audioData = await audioResponse.json();
//       if (!audioData.success || !audioData.audio?.id) {
//         throw new Error("Audio generation failed");
//       }
//       const audioId = audioData.audio.id;

//       const videoResponse = await fetch("/api/video/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
//         },
//         body: JSON.stringify({
//           userIdentifier,
//           audioId,
//           templateId: generateForm.videoId,
//           text: generateForm.text,
//         }),
//       });

//       if (!videoResponse.ok) {
//         throw new Error("Failed to generate video");
//       }

//       const videoData = await videoResponse.json();
//       if (!videoData.success || !videoData.videoId || !videoData.videoData) {
//         throw new Error("Video generation failed");
//       }

//       const videoBlob = Buffer.from(videoData.videoData, "base64");
//       const videoUrl = URL.createObjectURL(new Blob([videoBlob], { type: "video/mp4" }));
//       setPreview(videoUrl);
//       localStorage.setItem("generatedVideoId", videoData.videoId);
//       setCurrentStep(4);
//       localStorage.setItem("currentStep", "4");
//       toast.success("Video generation completed");
//     } catch (error) {
//       console.error("Error generating video:", error);
//       toast.error("An error occurred while generating video: " + (error instanceof Error ? error.message : String(error)));
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleSaveVideo = () => {
//     toast.success("Video saved to your library");
//     router.push("/videos");
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   return (
//     <>
//       {/* Step 1: Enter Script */}
//       {currentStep === 1 && (
//         <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
//           <div className="container mx-auto">
//             <div className="mb-6 text-center">
//               <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 AI Talking Head Synthesis
//               </h1>
//             </div>
//             <div className="max-w-4xl mx-auto">
//               <div className="transition-all duration-300">
//                 <div className="mb-6 text-center">
//                   <p className="text-base text-center max-w-2xl mx-auto">
//                     Enter your text below to create a realistic talking head video with synchronized lip movements
//                   </p>
//                 </div>
//                 <div className="relative mt-8">
//                   <Textarea
//                     ref={textareaRef}
//                     value={generateForm.text}
//                     onChange={(e) =>
//                       setGenerateForm((prev) => ({ ...prev, text: e.target.value }))
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && !e.shiftKey && currentStep === 1) {
//                         e.preventDefault();
//                         if (generateForm.text.trim() !== "") {
//                           handleNextStep();
//                         }
//                       }
//                     }}
//                     placeholder="Type or paste your script here..."
//                     className="min-h-[120px] pr-12 resize-none border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500 rounded-xl"
//                   />
//                   <Button
//                     onClick={handleNextStep}
//                     disabled={generateForm.text.trim() === ""}
//                     className="absolute bottom-3 right-3 rounded-full h-9 w-9 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                   >
//                     <Send className="h-4 w-4" />
//                     <span className="sr-only">Send</span>
//                   </Button>
//                 </div>
//                 <div className="mt-2 text-xs text-center text-muted-foreground">
//                   Press Enter to continue
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Step 2: Select Avatar */}
//       {currentStep === 2 && (
//         <div className="container mx-auto">
//           <div className="mb-6">
//             <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Select an Avatar
//             </h1>
//             <p className="text-muted-foreground text-sm">
//               {currentStep < 4 ? `Step ${currentStep} of 3` : "Your video is ready"}
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="transition-all duration-300">
//               <div className="mb-6">
                // <p className="text-base text-center max-w-2xl mx-auto">
                //   Choose the character that will deliver your message
                // </p>
//               </div>

//               {}
//               <div className="mb-8">
//                 <h2 className="text-xl font-medium text-gray-700">Default Avatars</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                   {avatarTemplates.map((avatar) => (
//                     <Card
//                       key={avatar.id}
//                       onClick={() =>
//                         setGenerateForm((prev) => ({ ...prev, videoId: avatar.id }))
//                       }
//                       className={`p-0 rounded-sm overflow-hidden cursor-pointer transition-all hover:shadow-md
//                         ${
//                           generateForm.videoId === avatar.id
//                             ? "border-blue-500 ring-2 ring-blue-500"
//                             : "border-gray-200 dark:border-gray-800"
//                         }`}
//                     >
//                       <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
//                         <video
//                           ref={(el) => {
//                             if (el) videoRefs.current[avatar.id] = el;
//                           }}
//                           src={avatar.video}
//                           preload="metadata"
//                           muted
//                           loop
//                           autoPlay={generateForm.videoId === avatar.id}
//                           onError={(e) =>
//                             console.error(`Video load error for avatar ${avatar.id}:`, e)
//                           }
//                         />
//                         <Button
//                           variant="secondary"
//                           size="icon"
//                           className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-md"
//                           onClick={() => toggleVideo(avatar.id)}
//                         >
//                           {playingVideo[avatar.id] ? (
//                             <Pause className="h-5 w-5 text-blue-600 dark:text-white" />
//                           ) : (
//                             <Play className="h-5 w-5 text-blue-600 dark:text-white" />
//                           )}
//                         </Button>
//                       </div>
//                       <CardContent className="p-3">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium">{avatar.name}</p>
//                           </div>
//                           {generateForm.videoId === avatar.id && (
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

//               {/* User-Uploaded Avatars (Only if exists) */}
//               {userAvatars.length > 0 && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-medium text-gray-700">Your Avatars</h2>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                     {userAvatars.map((avatar) => (
//                       <Card
//                         key={avatar.id}
//                         onClick={() =>
//                           setGenerateForm((prev) => ({ ...prev, videoId: avatar.id }))
//                         }
//                         className={`p-0 rounded-sm overflow-hidden cursor-pointer transition-all hover:shadow-md
//                           ${
//                             generateForm.videoId === avatar.id
//                               ? "border-blue-500 ring-2 ring-blue-500"
//                               : "border-gray-200 dark:border-gray-800"
//                           }`}
//                       >
//                         <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
//                           <video
//                             ref={(el) => {
//                               if (el) videoRefs.current[avatar.id] = el;
//                             }}
//                             src={avatar.video}
//                             preload="metadata"
//                             muted
//                             loop
//                             autoPlay={generateForm.videoId === avatar.id}
//                             onError={(e) =>
//                               console.error(`Video load error for avatar ${avatar.id}:`, e)
//                             }
//                           />
//                           <Button
//                             variant="secondary"
//                             size="icon"
//                             className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-md"
//                             onClick={() => toggleVideo(avatar.id)}
//                           >
//                             {playingVideo[avatar.id] ? (
//                               <Pause className="h-5 w-5 text-blue-600 dark:text-white" />
//                             ) : (
//                               <Play className="h-5 w-5 text-blue-600 dark:text-white" />
//                             )}
//                           </Button>
//                         </div>
//                         <CardContent className="p-3">
//                           <div className="flex justify-between items-center">
//                             <div>
//                               <p className="font-medium">{avatar.name}</p>
//                             </div>
//                             {generateForm.videoId === avatar.id && (
//                               <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
//                                 <Check className="h-3 w-3 text-white" />
//                               </div>
//                             )}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div className="flex justify-between">
//                 <Button
//                   variant="outline"
//                   onClick={handlePreviousStep}
//                   className="border-blue-200 dark:border-blue-800"
//                 >
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back
//                 </Button>
//                 <Button
//                   onClick={handleNextStep}
//                   disabled={generateForm.videoId === ""}
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
//                   Next
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Step 3: Select Voice */}
//       {currentStep === 3 && (
//         <div className="container mx-auto">
//           <div className="mb-6">
//             <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Choose a Voice
//             </h1>
//             <p className="text-muted-foreground text-sm">
//               {currentStep < 4 ? `Step ${currentStep} of 3` : "Your video is ready"}
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="transition-all duration-300">
//               <div className="mb-6">
//                 <p className="text-base text-center max-w-2xl mx-auto">
//                   Select the voice that will be used for your video
//                 </p>
//               </div>
//               <div className="space-y-3 mb-6">
//                 {audioFiles.map((voice) => (
//                   <Card
//                     key={voice.id}
//                     className={`p-0 rounded-none shadow-md overflow-hidden transition-all
//                       ${
//                         generateForm.audioId === voice.id
//                           ? "border-blue-500 ring-1 ring-blue-500"
//                           : "border-gray-200 dark:border-gray-800"
//                       }`}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex items-center space-x-2">
//                         <RadioGroup
//                           value={generateForm.audioId}
//                           onValueChange={(value) =>
//                             setGenerateForm((prev) => ({
//                               ...prev,
//                               audioId: voice.id,
//                               audio_text: voice.text,
//                             }))
//                           }
//                           className="flex-1"
//                         >
//                           <div className="flex items-center space-x-2">
//                             <RadioGroupItem
//                               value={voice.id}
//                               id={voice.id}
//                               className="text-blue-600"
//                             />
//                             <div>
//                               <Label htmlFor={voice.id} className="font-medium cursor-pointer">
//                                 {voice.name}
//                               </Label>
//                               <p className="mt-2 text-xs text-muted-foreground">
//                                 {voice.gender} • English
//                               </p>
//                             </div>
//                           </div>
//                         </RadioGroup>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="h-8 border-blue-200 dark:border-blue-800"
//                           onClick={() => toggleAudio(voice.id)}
//                         >
//                           {playingAudio[voice.id] ? (
//                             <Pause className="h-4 w-4 mr-1" />
//                           ) : (
//                             <Play className="h-4 w-4 mr-1" />
//                           )}
//                           Preview
//                           <audio
//                             ref={(el) => {
//                               if (el) audioRefs.current[voice.id] = el;
//                             }}
//                             src={voice.audio}
//                           />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//               <div className="flex justify-between">
//                 <Button
//                   variant="outline"
//                   onClick={handlePreviousStep}
//                   className="border-blue-200 dark:border-blue-800"
//                 >
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back
//                 </Button>
//                 <Button
//                   onClick={handleGenerate}
//                   disabled={generateForm.audioId === "" || isGenerating}
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                 >
//                   {isGenerating ? (
//                     <>
//                       <RotateCw className="mr-2 h-4 w-4 animate-spin" />
//                       Generating...
//                     </>
//                   ) : (
//                     <>Generate Video</>
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Step 4: Preview */}
//       {currentStep === 4 && (
//         <div className="container mx-auto">
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Preview Your Video
//             </h1>
//             <p className="text-muted-foreground text-sm">
//               {currentStep < 4 ? `Step ${currentStep} of 3` : "Your video is ready"}
//             </p>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="transition-all duration-300">
//               <div className="mb-6">
//                 <p className="text-lg text-center max-w-2xl mx-auto">
//                   Preview your talking head video and make adjustments if needed
//                 </p>
//               </div>
//               <Card className="p-0 rounded-none overflow-hidden border-blue-200 dark:border-blue-800 shadow-md mb-6">
//                 <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
//                   {preview ? (
//                     <div className="h-full w-full">
//                       <video
//                         ref={previewVideoRef}
//                         src={preview}
//                         className="h-full w-full object-contain"
//                         onClick={togglePreviewVideoPlay}
//                         onLoadedMetadata={() => {
//                           const video = previewVideoRef.current;
//                           if (video) {
//                             setVideoDuration(video.duration);
//                           }
//                         }}
//                       />
//                       {!isPlaying && (
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70 border-white/20"
//                             onClick={togglePreviewVideoPlay}
//                           >
//                             <Play className="h-8 w-8 pl-1" />
//                           </Button>
//                         </div>
//                       )}
//                       <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-4">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-white hover:bg-white/20"
//                           onClick={togglePreviewVideoPlay}
//                         >
//                           {isPlaying ? (
//                             <Pause className="h-5 w-5" />
//                           ) : (
//                             <Play className="h-5 w-5" />
//                           )}
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-white hover:bg-white/20"
//                           onClick={() => {
//                             const video = previewVideoRef.current;
//                             if (video) {
//                               video.currentTime = Math.max(0, video.currentTime - 10);
//                               setCurrentTime(video.currentTime);
//                             }
//                           }}
//                         >
//                           <svg
//                             className="h-5 w-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M11 5v14l-8-7h-2v-2h2l8-7zm2 0v14l8-7h2v-2h-2l-8-7z"
//                             />
//                           </svg>
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-white hover:bg-white/20"
//                           onClick={() => {
//                             const video = previewVideoRef.current;
//                             if (video) {
//                               video.currentTime = Math.min(
//                                 video.duration,
//                                 video.currentTime + 10
//                               );
//                               setCurrentTime(video.currentTime);
//                             }
//                           }}
//                         >
//                           <svg
//                             className="h-5 w-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M13 5v14l8-7h2v-2h-2l-8-7zm-2 0v14l-8-7h-2v-2h2l8-7z"
//                             />
//                           </svg>
//                         </Button>
//                         <div className="flex-1">
//                           <Slider
//                             value={[currentTime]}
//                             max={videoDuration}
//                             step={0.1}
//                             onValueChange={(value) => {
//                               const video = previewVideoRef.current;
//                               if (video) {
//                                 video.currentTime = value[0];
//                                 setCurrentTime(value[0]);
//                               }
//                             }}
//                             className="[&>span:first-child]:bg-white/30 [&>span:first-child_span]:bg-blue-500 cursor-pointer"
//                           />
//                         </div>
//                         <div className="text-sm text-white">
//                           {formatTime(currentTime)} / {formatTime(videoDuration)}
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-white hover:bg-white/20"
//                           onClick={togglePreviewVideoMute}
//                         >
//                           {isMuted ? (
//                             <VolumeX className="h-5 w-5" />
//                           ) : (
//                             <Volume2 className="h-5 w-5" />
//                           )}
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-white hover:bg-white/20"
//                           onClick={() => {
//                             const video = previewVideoRef.current;
//                             if (video) {
//                               video.requestFullscreen();
//                             }
//                           }}
//                         >
//                           <Maximize className="h-5 w-5" />
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex h-full w-full flex-col items-center justify-center text-white">
//                       <RotateCw className="h-8 w-8 animate-spin mb-4" />
//                       <p className="text-center text-lg font-medium">
//                         Generating your video...
//                       </p>
//                       <p className="text-center text-sm text-white/70">
//                         This may take a few moments
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </Card>
//               {preview && (
//                 <div className="flex justify-between">
//                   <Button
//                     variant="outline"
//                     onClick={() => setCurrentStep(1)}
//                     className="border-blue-200 dark:border-blue-800"
//                   >
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Create New Video
//                   </Button>
//                   <div className="space-x-2">
//                     <Button
//                       variant="outline"
//                       className="border-blue-200 dark:border-blue-800"
//                     >
//                       Download
//                     </Button>
//                     <Button
//                       onClick={handleSaveVideo}
//                       className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                     >
//                       Save to Library
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }






"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCw,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  Rewind,
  FastForward,
  FileText,
  User,
  Mic,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { getUserId } from "@/lib/authenticate"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";


type Avatar = { id: string; name: string; gender?: string; video: string; type: string }
type Voice = { id: string; name: string; gender: string; audio: string; text: string }

export default function WorkspacePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [generateForm, setGenerateForm] = useState({
    email: "",
    text: "",
    videoId: "",
    audioId: "",
    audio_text: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [preview, setPreview] = useState("")
  const [avatarTemplates, setAvatarTemplates] = useState<Avatar[]>([])
  const [userAvatars, setUserAvatars] = useState<Avatar[]>([])
  const [audioFiles, setAudioFiles] = useState<Voice[]>([])
  const [playingVideo, setPlayingVideo] = useState<Record<string, boolean>>({})
  const [playingAudio, setPlayingAudio] = useState<Record<string, boolean>>({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const userIdentifier = getUserId()

  useEffect(() => {
    const initializeState = async () => {
      const savedStep = localStorage.getItem("currentStep")
      setCurrentStep(savedStep ? Number.parseInt(savedStep, 10) : 1)
      const savedVideoId = localStorage.getItem("generatedVideoId") || ""
      setGenerateForm({
        ...generateForm,
        text: localStorage.getItem("scriptText") || "",
        videoId: localStorage.getItem("selectedTemplateId") || "",
        audioId: localStorage.getItem("selectedAudioId") || "",
      })

      if (savedVideoId) {
        try {
          console.log("Fetching video data for videoId:", savedVideoId)
          const response = await fetch(`/api/video/get?videoId=${savedVideoId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
          })
          if (!response.ok) throw new Error("Failed to fetch video data")
          const data = await response.json()
          if (data.success && data.videoData) {
            const videoBlob = new Blob([Buffer.from(data.videoData, "base64")], { type: "video/mp4" })
            const videoUrl = URL.createObjectURL(videoBlob)
            setPreview(videoUrl)
            console.log("Set preview URL:", videoUrl)
          } else {
            console.error("No video data found for videoId:", savedVideoId)
            setPreview("")
            localStorage.removeItem("generatedVideoId")
            toast.error("Generated video not found. Please generate a new video.")
          }
        } catch (error) {
          console.error("Error fetching video data:", error)
          setPreview("")
          localStorage.removeItem("generatedVideoId")
          toast.error("Failed to load generated video")
        }
      }
    }

    initializeState()

    if (!userIdentifier) {
      router.push("/login")
      return
    }

    fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((response) => {
        if (!response.ok && response.status !== 404) {
          localStorage.removeItem("token")
          router.push("/login")
        }
      })
      .catch((error) => console.error("Token verification error:", error))
  }, [router, userIdentifier])

  useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true)
      try {
        const audioResponse = await fetch("/api/audio/select", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        })
        const audioData = await audioResponse.json()
        if (audioData.audioFiles) {
          setAudioFiles(
            audioData.audioFiles.map((audio: any) => ({
              id: audio.id,
              name: audio.name || `Voice ${audio.id}`,
              gender: audio.gender || "Unknown",
              audio: audio.path,
              text: audio.normalizedText || "",
            })),
          )
        }

        const templatesResponse = await fetch("/api/video/templates", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        })
        const templatesData = await templatesResponse.json()
        if (templatesData.templates) {
          const templatesWithUrls = templatesData.templates.map((template: any) => {
            try {
              const videoBuffer = Buffer.from(template.videoPath, "base64")
              const videoBlob = new Blob([videoBuffer], { type: "video/mp4" })
              const videoUrl = URL.createObjectURL(videoBlob)
              return {
                id: template.id,
                name: template.title,
                video: videoUrl,
                type: "default",
              }
            } catch (error) {
              console.error(`Failed to create Blob URL for template ${template.id}:`, error)
              return {
                id: template.id,
                name: template.title,
                video: "/placeholder-video.mp4",
                type: "default",
              }
            }
          })
          setAvatarTemplates(templatesWithUrls)
        }

        if (userIdentifier) {
          const userAvatarsResponse = await fetch(`/api/user-avatars?userIdentifier=${userIdentifier}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
          })
          const userAvatarsData = await userAvatarsResponse.json()
          if (userAvatarsData) {
            const formattedAvatars = userAvatarsData.map((avatar: any) => {
              try {
                const videoBlob = new Blob([Buffer.from(avatar.video.split(",")[1], "base64")], {
                  type: "video/mp4",
                })
                const videoUrl = URL.createObjectURL(videoBlob)
                return {
                  id: avatar.id,
                  name: avatar.name,
                  gender: avatar.gender,
                  video: videoUrl,
                  type: avatar.type,
                }
              } catch (error) {
                console.error(`Failed to create Blob URL for avatar ${avatar.id}:`, error)
                return {
                  id: avatar.id,
                  name: avatar.name,
                  gender: avatar.gender,
                  video: "/placeholder-video.mp4",
                  type: avatar.type,
                }
              }
            })
            setUserAvatars(formattedAvatars)
          }
        }
      } catch (error) {
        console.error("Error loading resources:", error)
        toast.error("Failed to load resources")
      } finally {
        setIsLoading(false)
      }
    }

    loadResources()
  }, [userIdentifier])

  useEffect(() => {
    const video = previewVideoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const handleVideoEnd = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("ended", handleVideoEnd)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("ended", handleVideoEnd)
    }
  }, [preview])

  const toggleVideo = (id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation()

    const video = videoRefs.current[id]
    if (video) {
      if (video.paused) {
        Object.entries(videoRefs.current).forEach(([key, v]) => {
          if (v && key !== id && !v.paused) {
            v.pause()
            setPlayingVideo((prev) => ({ ...prev, [key]: false }))
          }
        })

        video.play()
        setPlayingVideo((prev) => ({ ...prev, [id]: true }))
      } else {
        video.pause()
        setPlayingVideo((prev) => ({ ...prev, [id]: false }))
      }
    }
  }

  const toggleAudio = (id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation()

    const audio = audioRefs.current[id]
    if (audio) {
      if (audio.paused) {
        Object.entries(audioRefs.current).forEach(([key, a]) => {
          if (a && key !== id && !a.paused) {
            a.pause()
            setPlayingAudio((prev) => ({ ...prev, [key]: false }))
          }
        })

        audio.play()
        setPlayingAudio((prev) => ({ ...prev, [id]: true }))
      } else {
        audio.pause()
        setPlayingAudio((prev) => ({ ...prev, [id]: false }))
      }
    }
  }

  const togglePreviewVideoPlay = () => {
    const video = previewVideoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((error) => console.error("Play failed:", error))
    }
    setIsPlaying(!isPlaying)
  }

  const togglePreviewVideoMute = () => {
    const video = previewVideoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const seekVideo = (seconds: number) => {
    const video = previewVideoRef.current
    if (!video) return

    const newTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleNextStep = () => {
    if (currentStep === 1 && generateForm.text.trim() !== "") {
      setCurrentStep(2)
      localStorage.setItem("currentStep", "2")
      localStorage.setItem("scriptText", generateForm.text)
    } else if (currentStep === 2 && generateForm.videoId !== "") {
      setCurrentStep(3)
      localStorage.setItem("currentStep", "3")
      localStorage.setItem("selectedTemplateId", generateForm.videoId)
    } else if (currentStep === 3 && generateForm.audioId !== "") {
      handleGenerate()
    } else {
      toast.error("Please complete the current step before proceeding")
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      localStorage.setItem("currentStep", (currentStep - 1).toString())
    }
  }

  const handleGenerate = async () => {
    if (!userIdentifier) {
      toast.error("User identifier not found")
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        return newProgress > 95 ? 95 : newProgress
      })
    }, 500)

    try {
      const audioResponse = await fetch("/api/audio/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          text: generateForm.text,
          userIdentifier,
          voiceId: generateForm.audioId,
        }),
      })

      if (!audioResponse.ok) {
        throw new Error("Failed to generate audio")
      }

      const audioData = await audioResponse.json()
      if (!audioData.success || !audioData.audio?.id) {
        throw new Error("Audio generation failed")
      }

      const audioId = audioData.audio.id
      setGenerationProgress(50)

      const videoResponse = await fetch("/api/video/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          userIdentifier,
          audioId,
          templateId: generateForm.videoId,
          text: generateForm.text,
        }),
      })

      if (!videoResponse.ok) {
        throw new Error("Failed to generate video")
      }

      const videoData = await videoResponse.json()
      console.log("Video generation response:", videoData)
      if (!videoData.success || !videoData.videoId || !videoData.videoData) {
        throw new Error("Video generation failed: Missing videoId or videoData")
      }

      setGenerationProgress(100)

      const videoBlob = Buffer.from(videoData.videoData, "base64")
      const videoUrl = URL.createObjectURL(new Blob([videoBlob], { type: "video/mp4" }))
      setPreview(videoUrl)
      localStorage.setItem("generatedVideoId", videoData.videoId)
      setCurrentStep(4)
      localStorage.setItem("currentStep", "4")
      toast.success("Video generation completed")
    } catch (error) {
      console.error("Error generating video:", error)
      toast.error(
        "An error occurred while generating video: " + (error instanceof Error ? error.message : String(error)),
      )
    } finally {
      clearInterval(progressInterval)
      setIsGenerating(false)
    }
  }

  const handleSaveVideo = () => {
    localStorage.removeItem("generatedVideoId")
    localStorage.removeItem("currentStep")
    toast.success("Video saved to your library")
    router.push("/videos")
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700"
              }`}
            >
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className={`font-medium ${currentStep >= 1 ? "text-blue-600" : "text-gray-500"}`}>Script</p>
              <p className="text-xs text-muted-foreground">Enter your text</p>
            </div>
          </div>

          <div className={`h-1 flex-1 mx-4 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />

          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700"
              }`}
            >
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className={`font-medium ${currentStep >= 2 ? "text-blue-600" : "text-gray-500"}`}>Avatar</p>
              <p className="text-xs text-muted-foreground">Select character</p>
            </div>
          </div>

          <div className={`h-1 flex-1 mx-4 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />

          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700"
              }`}
            >
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <p className={`font-medium ${currentStep >= 3 ? "text-blue-600" : "text-gray-500"}`}>Voice</p>
              <p className="text-xs text-muted-foreground">Choose voice</p>
            </div>
          </div>

          <div className={`h-1 flex-1 mx-4 ${currentStep >= 4 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />

          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                currentStep >= 4 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700"
              }`}
            >
              <Video className="h-5 w-5" />
            </div>
            <div>
              <p className={`font-medium ${currentStep >= 4 ? "text-blue-600" : "text-gray-500"}`}>Preview</p>
              <p className="text-xs text-muted-foreground">Final result</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Enter Script */}
      {currentStep === 1 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
                <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Talking Head Synthesis
              </h1>
              <p className="text-base text-center max-w-2xl mx-auto">
              Enter your text below to create a realistic talking head video with synchronized lip movements
              </p>
          </div>

          <div className="mb-8">
            <Label htmlFor="script" className="text-xl sm:text-2xl font-medium mb-4 block">
              Your Script
            </Label>
            <div className="relative">
              <Textarea
                id="script"
                ref={textareaRef}
                value={generateForm.text}
                onChange={(e) => setGenerateForm((prev) => ({ ...prev, text: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && currentStep === 1) {
                    e.preventDefault()
                    if (generateForm.text.trim() !== "") {
                      handleNextStep()
                    }
                  }
                }}
                placeholder="Type or paste your script here..."
                className="min-h-[250px] w-full pr-12 resize-none border-blue-200 dark:border-blue-800 focus-visible:ring-blue-500 rounded-xl text-lg"
              />
              <Button
                onClick={handleNextStep}
                disabled={generateForm.text.trim() === ""}
                className="absolute bottom-4 right-4 rounded-full h-12 w-12 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                aria-label="Continue to next step"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Press Enter to continue or use the button</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-3 text-blue-700 dark:text-blue-400">
              Tips for better results:
            </h3>
            <ul className="text-base text-muted-foreground space-y-2 list-disc pl-6">
              <li>Keep sentences clear and concise</li>
              <li>Avoid complex technical terms if possible</li>
              <li>Aim for 10-30 words for optimal performance</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNextStep}
              disabled={generateForm.text.trim() === ""}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-6 py-3"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Select Avatar */}
       {currentStep === 2 && (
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Select an Avatar
            </h1>
            <p className="text-muted-foreground text-sm">
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="transition-all duration-300">
              <div className="mb-6">
                <p className="text-base text-center max-w-2xl mx-auto">
                  Choose the character that will deliver your message
                </p>
              </div>

              {}
              <div className="mb-8">
                <h2 className="text-xl font-medium text-gray-700">Default Avatars</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {avatarTemplates.map((avatar) => (
                    <Card
                      key={avatar.id}
                      onClick={() =>
                        setGenerateForm((prev) => ({ ...prev, videoId: avatar.id }))
                      }
                      className={`p-0 rounded-sm overflow-hidden cursor-pointer transition-all hover:shadow-md
                        ${
                          generateForm.videoId === avatar.id
                            ? "border-blue-500 ring-2 ring-blue-500"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                    >
                      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[avatar.id] = el;
                          }}
                          src={avatar.video}
                          preload="metadata"
                          muted
                          loop
                          autoPlay={generateForm.videoId === avatar.id}
                          onError={(e) =>
                            console.error(`Video load error for avatar ${avatar.id}:`, e)
                          }
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-md"
                          onClick={() => toggleVideo(avatar.id)}
                        >
                          {playingVideo[avatar.id] ? (
                            <Pause className="h-5 w-5 text-blue-600 dark:text-white" />
                          ) : (
                            <Play className="h-5 w-5 text-blue-600 dark:text-white" />
                          )}
                        </Button>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{avatar.name}</p>
                          </div>
                          {generateForm.videoId === avatar.id && (
                            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* User-Uploaded Avatars (Only if exists) */}
              {userAvatars.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-medium text-gray-700">Your Avatars</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {userAvatars.map((avatar) => (
                      <Card
                        key={avatar.id}
                        onClick={() =>
                          setGenerateForm((prev) => ({ ...prev, videoId: avatar.id }))
                        }
                        className={`p-0 rounded-sm overflow-hidden cursor-pointer transition-all hover:shadow-md
                          ${
                            generateForm.videoId === avatar.id
                              ? "border-blue-500 ring-2 ring-blue-500"
                              : "border-gray-200 dark:border-gray-800"
                          }`}
                      >
                        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                          <video
                            ref={(el) => {
                              if (el) videoRefs.current[avatar.id] = el;
                            }}
                            src={avatar.video}
                            preload="metadata"
                            muted
                            loop
                            autoPlay={generateForm.videoId === avatar.id}
                            onError={(e) =>
                              console.error(`Video load error for avatar ${avatar.id}:`, e)
                            }
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-3 left-3 h-10 w-10 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 shadow-md"
                            onClick={() => toggleVideo(avatar.id)}
                          >
                            {playingVideo[avatar.id] ? (
                              <Pause className="h-5 w-5 text-blue-600 dark:text-white" />
                            ) : (
                              <Play className="h-5 w-5 text-blue-600 dark:text-white" />
                            )}
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{avatar.name}</p>
                            </div>
                            {generateForm.videoId === avatar.id && (
                              <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="border-blue-200 dark:border-blue-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={generateForm.videoId === ""}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Select Voice */}
      {currentStep === 3 && (
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Choose a Voice
            </h1>
            <p className="text-muted-foreground text-sm">
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="transition-all duration-300">
              <div className="mb-6">
                <p className="text-base text-center max-w-2xl mx-auto">
                  Select the voice that will be used for your video
                </p>
              </div>
              <div className="space-y-3 mb-6">
                {audioFiles.map((voice) => (
                  <Card
                    key={voice.id}
                    className={`p-0 rounded-none shadow-md overflow-hidden transition-all
                      ${
                        generateForm.audioId === voice.id
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-gray-200 dark:border-gray-800"
                      }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroup
                          value={generateForm.audioId}
                          onValueChange={(value) =>
                            setGenerateForm((prev) => ({
                              ...prev,
                              audioId: voice.id,
                              audio_text: voice.text,
                            }))
                          }
                          className="flex-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={voice.id}
                              id={voice.id}
                              className="text-blue-600"
                            />
                            <div>
                              <Label htmlFor={voice.id} className="font-medium cursor-pointer">
                                {voice.name}
                              </Label>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {voice.gender} • English
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-blue-200 dark:border-blue-800"
                          onClick={() => toggleAudio(voice.id)}
                        >
                          {playingAudio[voice.id] ? (
                            <Pause className="h-4 w-4 mr-1" />
                          ) : (
                            <Play className="h-4 w-4 mr-1" />
                          )}
                          Preview
                          <audio
                            ref={(el) => {
                              if (el) audioRefs.current[voice.id] = el;
                            }}
                            src={voice.audio}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="border-blue-200 dark:border-blue-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={generateForm.audioId === "" || isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isGenerating ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate Video</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Preview */}
      {currentStep === 4 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Video is Ready
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mt-2">
              Preview your talking head video and save it to your library
            </p>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden mb-8 max-w-5xl mx-auto">
            {preview ? (
              <div className="h-full w-full">
                <video
                  ref={previewVideoRef}
                  src={preview}
                  className="h-full w-full object-contain"
                  onClick={togglePreviewVideoPlay}
                  onLoadedMetadata={() => {
                    const video = previewVideoRef.current
                    if (video) {
                      setVideoDuration(video.duration)
                    }
                  }}
                  onError={(e) => console.error("Preview video load error:", e)}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-20 w-20 rounded-full bg-black/50 text-white hover:bg-black/70 border-white/20"
                      onClick={togglePreviewVideoPlay}
                      aria-label="Play video"
                    >
                      <Play className="h-10 w-10 pl-2" />
                    </Button>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={togglePreviewVideoPlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => seekVideo(-10)}
                    aria-label="Rewind 10 seconds"
                  >
                    <Rewind className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => seekVideo(10)}
                    aria-label="Forward 10 seconds"
                  >
                    <FastForward className="h-6 w-6" />
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={[currentTime]}
                      max={videoDuration || 100}
                      step={0.1}
                      onValueChange={(value) => {
                        const video = previewVideoRef.current
                        if (video) {
                          video.currentTime = value[0]
                          setCurrentTime(value[0])
                        }
                      }}
                      className="[&>span:first-child]:bg-white/30 [&>span:first-child_span]:bg-blue-500 cursor-pointer"
                      aria-label="Video progress"
                    />
                  </div>
                  <div className="text-base text-white">
                    {formatTime(currentTime)} / {formatTime(videoDuration)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={togglePreviewVideoMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => {
                      const video = previewVideoRef.current
                      if (video) {
                        video.requestFullscreen().catch((err) => {
                          console.error("Error attempting to enable fullscreen:", err)
                        })
                      }
                    }}
                    aria-label="Fullscreen"
                  >
                    <Maximize className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-white">
                <RotateCw className="h-10 w-10 animate-spin mb-4" />
                <p className="text-center text-xl font-medium">Generating your video...</p>
                <p className="text-center text-base text-white/70">This may take a few moments</p>
              </div>
            )}
          </div>

          {preview && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="border-2 border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3 text-blue-700 dark:text-blue-400">Video Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-lg font-medium">Script:</span>
                    <p className="text-base text-muted-foreground mt-2">{generateForm.text}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <span className="text-lg font-medium">Avatar:</span>
                      <p className="text-base text-muted-foreground mt-2">
                        {avatarTemplates.find((a) => a.id === generateForm.videoId)?.name ||
                          userAvatars.find((a) => a.id === generateForm.videoId)?.name ||
                          "Custom Avatar"}
                      </p>
                    </div>
                    <div>
                      <span className="text-lg font-medium">Voice:</span>
                      <p className="text-base text-muted-foreground mt-2">
                        {audioFiles.find((a) => a.id === generateForm.audioId)?.name || "Custom Voice"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {preview && (
            <div className="flex flex-col sm:flex-row justify-between gap-4 max-w-3xl mx-auto">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(1)
                  localStorage.setItem("currentStep", "1")
                  localStorage.removeItem("generatedVideoId")
                }}
                className="border-blue-200 dark:border-blue-800 text-lg px-6 py-3 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Create New Video
              </Button>
              <div className="flex gap-4 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-blue-200 dark:border-blue-800 text-lg px-6 py-3 flex-1 sm:flex-none"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = preview
                    a.download = `voicesync_video_${Date.now()}.mp4`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    toast.success("Download started")
                  }}
                >
                  Download
                </Button>
                <Button
                  onClick={handleSaveVideo}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-6 py-3 flex-1 sm:flex-none"
                >
                  Save to Library
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
