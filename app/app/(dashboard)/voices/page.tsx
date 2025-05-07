



// "use client"

// import { useState, useEffect, useRef } from "react"
// import { toast } from "react-toastify"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Play, Pause, Loader2, Mic, Music, User, Volume2, VolumeX } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { getUserId } from "@/lib/authenticate"
// import Link from "next/link"
// import { motion } from "framer-motion"

// export default function VoicesPage() {
//   const [availableVoices, setAvailableVoices] = useState([])
//   const [userVoices, setUserVoices] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const audioRefs = useRef({})
//   const [playingAudio, setPlayingAudio] = useState({})
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState("available")

//   useEffect(() => {
//     const checkAuthAndFetchVoices = async () => {
//       try {
//         setIsLoading(true)
//         const userIdentifier = await getUserId()
//         setIsAuthenticated(!!userIdentifier)

//         const res = await fetch("/api/audio/select")
//         if (!res.ok) {
//           if (res.status === 401) {
//             toast.error("Please log in to view your voices", {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               theme: "colored",
//             })
//             router.push("/login")
//             return
//           }
//           throw new Error("Failed to fetch audio")
//         }

//         const data = await res.json()
//         if (data.audioFiles) {
//           const available = data.audioFiles.filter((voice: any) => voice.source === "Voice")
//           const user = data.audioFiles.filter((voice: any) => voice.source === "UserVoice")
//           setAvailableVoices(available)
//           setUserVoices(user)

//           if (user.length > 0) {
//             setActiveTab("your")
//           }
//         } else {
//           throw new Error("No audio data found")
//         }
//       } catch (error) {
//         console.error("Error fetching audio:", error)
//         toast.error(`Error fetching audio: ${error}`, {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "colored",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     checkAuthAndFetchVoices()
//   }, [router])

//   const toggleAudio = (id: string, audioPath: string) => {
//     const audio = audioRefs.current[id]

//     if (audio) {
//       if (!playingAudio[id]) {
//         Object.values(audioRefs.current).forEach((a: any) => {
//           if (a !== audio && !a.paused) {
//             a.pause()
//             a.currentTime = 0
//           }
//         })
//         audio.src = audioPath
//         audio
//           .play()
//           .then(() => setPlayingAudio((prev: any) => ({ ...prev, [id]: true })))
//           .catch((error: any) => {
//             console.error("Error playing audio:", error)
//             toast.error("Failed to play audio preview", {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               theme: "colored",
//             })
//           })
//       } else {
//         audio.pause()
//         audio.currentTime = 0
//         setPlayingAudio((prev: any) => ({ ...prev, [id]: false }))
//       }
//     }
//   }

//   const getLanguageBadgeColor = (language) => {
//     const languages = {
//       English: "bg-emerald-100 text-emerald-800",
//       Spanish: "bg-purple-100 text-purple-800",
//       French: "bg-rose-100 text-rose-800",
//       German: "bg-amber-100 text-amber-800",
//       Italian: "bg-cyan-100 text-cyan-800",
//       Japanese: "bg-fuchsia-100 text-fuchsia-800",
//       Chinese: "bg-red-100 text-red-800",
//     }

//     return languages[language] || "bg-gray-100 text-gray-800"
//   }

//   const getGenderIcon = (gender) => {
//     if (gender.toLowerCase().includes("male")) {
//       return <User className="h-4 w-4 text-sky-600" />
//     } else if (gender.toLowerCase().includes("female")) {
//       return <User className="h-4 w-4 text-pink-600" />
//     } else {
//       return <User className="h-4 w-4 text-gray-600" />
//     }
//   }

//   const renderVoiceCard = (voice: any, index: number) => {
//     const isPlaying = playingAudio[voice.id]
//     const delay = index * 0.05

//     return (
//       <motion.div
//         key={voice.id}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, delay }}
//         className="w-full"
//       >
//         <Card className={`w-full transition-all duration-300 ${isPlaying ? "border-purple-400 shadow-md shadow-purple-100" : "hover:shadow-md"}`}>
//           <CardContent className="p-5">
//             <div className="flex items-center justify-between">
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="text-lg font-semibold">{voice.name}</h3>
//                   <div className="flex items-center gap-1 text-gray-500 text-sm">
//                     {getGenderIcon(voice.gender)}
//                     <span className="text-xs">{voice.gender}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLanguageBadgeColor(voice.language)}`}>
//                     {voice.language}
//                   </span>
//                   <span className="text-xs text-gray-500">{voice.source === "UserVoice" ? "Custom" : "Standard"}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <Button
//                     variant={isPlaying ? "default" : "outline"}
//                     size="sm"
//                     className={`gap-1.5 transition-all ${
//                       isPlaying
//                         ? "bg-purple-600 hover:bg-purple-700 text-white"
//                         :  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
//                     }`}
//                     onClick={() => toggleAudio(voice.id, voice.path)}
//                   >
//                     {isPlaying ? (
//                       <>
//                         <Pause className="h-3.5 w-3.5" />
//                         <span>Stop</span>
//                       </>
//                     ) : (
//                       <>
//                         <Play className="h-3.5 w-3.5" />
//                         <span>Preview</span>
//                       </>
//                     )}
//                   </Button>
//                   {isPlaying && (
//                     <div className="flex gap-1">
//                       {[1, 2, 3, 4].map((i) => (
//                         <motion.div
//                           key={i}
//                           className="w-1 h-4 bg-purple-500 rounded-full"
//                           animate={{ height: [4, 12, 4] }}
//                           transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <audio
//               ref={(el) => {
//                 if (el) audioRefs.current[voice.id] = el
//               }}
//               preload="none"
//               style={{ display: "none" }}
//               onEnded={() => setPlayingAudio((prev) => ({ ...prev, [voice.id]: false }))}
//             />
//           </CardContent>
//         </Card>
//       </motion.div>
//     )
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
//           <h2 className="text-xl font-medium text-gray-800">Loading voices...</h2>
//           <p className="text-gray-500 mt-2">Please wait while we prepare your audio experience</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-8">
//             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//               <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors">
//                 Voice Library
//               </h1>
//             </motion.div>
//           </div>

//           <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
//             <div className="flex justify-center mb-6">
//               <TabsList className="grid grid-cols-2 w-full max-w-md">
//                 <TabsTrigger value="available"  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
//                   <Music className="h-4 w-4 mr-2" />
//                   Available Voices
//                 </TabsTrigger>
//                 <TabsTrigger value="your" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white" disabled={!isAuthenticated}>
//                   <Mic className="h-4 w-4 mr-2" />
//                   Your Voices
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <TabsContent value="available" className="mt-0">
//               <div className="mb-4 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors">
//                     Available Voices
//                   </h2>
//                   <p className="text-gray-600">Listen to pre-imported voices available for use</p>
//                 </div>
//                 <Badge variant="outline"  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
//                   <Volume2 className="h-3.5 w-3.5 mr-1" />
//                   {availableVoices.length} Voices
//                 </Badge>
//               </div>

//               {availableVoices.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {availableVoices.map((voice, index) => renderVoiceCard(voice, index))}
//                 </div>
//               ) : (
//                 <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed">
//                   <CardContent className="flex flex-col items-center justify-center py-12">
//                     <VolumeX className="h-12 w-12 text-gray-400 mb-3" />
//                     <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                       No Available Voices
//                     </h3>
//                     <p className="text-gray-500 text-center mt-2 max-w-md">
//                       There are currently no pre-imported voices available. Please check back later.
//                     </p>
//                   </CardContent>
//                 </Card>
//               )}
//             </TabsContent>

//             <TabsContent value="your" className="mt-0">
//               {isAuthenticated ? (
//                 <>
//                   <div className="mb-4 flex items-center justify-between">
//                     <div>
//                       <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors">
//                         Your Voices
//                       </h2>
//                       <p className="text-gray-600">Listen to the voices you've uploaded</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
//                         <User className="h-3.5 w-3.5 mr-1" />
//                         {userVoices.length} Voices
//                       </Badge>
//                     </div>
//                   </div>

//                   {userVoices.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {userVoices.map((voice, index) => renderVoiceCard(voice, index))}
//                     </div>
//                   ) : (
//                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
//                       <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed">
//                         <CardContent className="flex flex-col items-center justify-center py-12">
//                           <Mic className="h-12 w-12 text-gray-400 mb-3" />
//                           <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                             No Uploaded Voices
//                           </h3>
//                           <p className="text-gray-500 text-center mt-2 max-w-md">
//                             You haven't uploaded any voices yet. Record your voice to personalize your experience!
//                           </p>
//                           <Link href="/upload-voice" className="mt-6">
//                             <Button className="bg-purple-600 hover:bg-purple-700 text-white">
//                               <Mic className="h-4 w-4 mr-2" />
//                               Upload a Voice
//                             </Button>
//                           </Link>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   )}
//                 </>
//               ) : (
//                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
//                   <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed">
//                     <CardContent className="flex flex-col items-center justify-center py-12">
//                       <User className="h-12 w-12 text-gray-400 mb-3" />
//                       <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                         Log In to See Your Voices
//                       </h3>
//                       <p className="text-gray-500 text-center mt-2 max-w-md">
//                         Please log in to view and manage your uploaded voices.
//                       </p>
//                       <Link href="/login" className="mt-6">
//                         <Button className="bg-purple-600 hover:bg-purple-700 text-white">Log In</Button>
//                       </Link>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Loader2, Mic, Music, User, Volume2, VolumeX, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserId } from "@/lib/authenticate"
import Link from "next/link"
import { motion } from "framer-motion"

export default function VoicesPage() {
  const [availableVoices, setAvailableVoices] = useState([])
  const [userVoices, setUserVoices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const audioRefs = useRef({})
  const [playingAudio, setPlayingAudio] = useState({})
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("available")

  useEffect(() => {
    const checkAuthAndFetchVoices = async () => {
      try {
        setIsLoading(true)
        const userIdentifier = await getUserId()
        setIsAuthenticated(!!userIdentifier)

        const res = await fetch("/api/audio/select")
        if (!res.ok) {
          if (res.status === 401) {
            toast.error("Please log in to view your voices", {
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
          throw new Error("Failed to fetch audio")
        }

        const data = await res.json()
        if (data.audioFiles) {
          const available = data.audioFiles.filter((voice: any) => voice.source === "Voice")
          const user = data.audioFiles.filter((voice: any) => voice.source === "UserVoice")
          setAvailableVoices(available)
          setUserVoices(user)

          if (user.length > 0) {
            setActiveTab("your")
          }
        } else {
          throw new Error("No audio data found")
        }
      } catch (error) {
        console.error("Error fetching audio:", error)
        toast.error(`Error fetching audio: ${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchVoices()
  }, [router])

  const toggleAudio = (id: string, audioPath: string) => {
    const audio = audioRefs.current[id]

    if (audio) {
      if (!playingAudio[id]) {
        Object.values(audioRefs.current).forEach((a: any) => {
          if (a !== audio && !a.paused) {
            a.pause()
            a.currentTime = 0
          }
        })
        audio.src = audioPath
        audio
          .play()
          .then(() => setPlayingAudio((prev: any) => ({ ...prev, [id]: true })))
          .catch((error: any) => {
            console.error("Error playing audio:", error)
            toast.error("Failed to play audio preview", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            })
          })
      } else {
        audio.pause()
        audio.currentTime = 0
        setPlayingAudio((prev: any) => ({ ...prev, [id]: false }))
      }
    }
  }

  const handleDeleteVoice = async (id: string) => {
    try {
      const response = await fetch("/api/audio/select", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      })

      if (response.ok) {
        setUserVoices((prev) => prev.filter((voice) => voice.id !== id))
        toast.success("Voice deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        })
      } else {
        toast.error("Failed to delete voice", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        })
      }
    } catch (error) {
      console.error("Error deleting voice:", error)
      toast.error("An error occurred while deleting the voice", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      })
    }
  }

  const getLanguageBadgeColor = (language) => {
    const languages = {
      English: "bg-emerald-100 text-emerald-800",
      Spanish: "bg-purple-100 text-purple-800",
      French: "bg-rose-100 text-rose-800",
      German: "bg-amber-100 text-amber-800",
      Italian: "bg-cyan-100 text-cyan-800",
      Japanese: "bg-fuchsia-100 text-fuchsia-800",
      Chinese: "bg-red-100 text-red-800",
    }

    return languages[language] || "bg-gray-100 text-gray-800"
  }

  const getGenderIcon = (gender) => {
    if (gender.toLowerCase().includes("male")) {
      return <User className="h-4 w-4 text-sky-600" />
    } else if (gender.toLowerCase().includes("female")) {
      return <User className="h-4 w-4 text-pink-600" />
    } else {
      return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const renderVoiceCard = (voice: any, index: number) => {
    const isPlaying = playingAudio[voice.id]
    const delay = index * 0.05

    return (
      <motion.div
        key={voice.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        className="w-full"
      >
        <Card className={`w-full transition-all duration-300 ${isPlaying ? "border-purple-400 shadow-md shadow-purple-100" : "hover:shadow-md"}`}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{voice.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    {getGenderIcon(voice.gender)}
                    <span className="text-xs">{voice.gender}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLanguageBadgeColor(voice.language)}`}>
                    {voice.language}
                  </span>
                  <span className="text-xs text-gray-500">{voice.source === "UserVoice" ? "Custom" : "Standard"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant={isPlaying ? "default" : "outline"}
                    size="sm"
                    className={`gap-1.5 transition-all ${
                      isPlaying
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                    }`}
                    onClick={() => toggleAudio(voice.id, voice.path)}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>Preview</span>
                      </>
                    )}
                  </Button>
                  {isPlaying && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-4 bg-purple-500 rounded-full"
                          animate={{ height: [4, 12, 4] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {voice.source === "UserVoice" && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="ml-2 h-8 w-8 rounded-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteVoice(voice.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <audio
              ref={(el) => {
                if (el) audioRefs.current[voice.id] = el
              }}
              preload="none"
              style={{ display: "none" }}
              onEnded={() => setPlayingAudio((prev) => ({ ...prev, [voice.id]: false }))}
            />
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-800">Loading voices...</h2>
          <p className="text-gray-500 mt-2">Please wait while we prepare your audio experience</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors">
                Voice Library
              </h1>
            </motion.div>
          </div>

          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="available" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                  <Music className="h-4 w-4 mr-2" />
                  Available Voices
                </TabsTrigger>
                <TabsTrigger value="your" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white" disabled={!isAuthenticated}>
                  <Mic className="h-4 w-4 mr-2" />
                  Your Voices
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="available" className="mt-0">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors">
                    Available Voices
                  </h2>
                  <p className="text-gray-600">Listen to pre-imported voices available for use</p>
                </div>
                <Badge variant="outline"  className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  <Volume2 className="h-3.5 w-3.5 mr-1" />
                  {availableVoices.length} Voices
                </Badge>
              </div>

              {availableVoices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableVoices.map((voice, index) => renderVoiceCard(voice, index))}
                </div>
              ) : (
                <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <VolumeX className="h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      No Available Voices
                    </h3>
                    <p className="text-gray-500 text-center mt-2 max-w-md">
                      There are currently no pre-imported voices available. Please check back later.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="your" className="mt-0">
              {isAuthenticated ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors">
                        Your Voices
                      </h2>
                      <p className="text-gray-600">Listen to the voices you've uploaded</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline"  className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {userVoices.length} Voices
                      </Badge>
                    </div>
                  </div>

                  {userVoices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userVoices.map((voice, index) => renderVoiceCard(voice, index))}
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                      <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Mic className="h-12 w-12 text-gray-400 mb-3" />
                          <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            No Uploaded Voices
                          </h3>
                          <p className="text-gray-500 text-center mt-2 max-w-md">
                            You haven't uploaded any voices yet. Record your voice to personalize your experience!
                          </p>
                          <Link href="/upload-voice" className="mt-6">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              <Mic className="h-4 w-4 mr-2" />
                              Upload a Voice
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                  <Card className="w-full bg-white/50 backdrop-blur-sm border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <User className="h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Log In to See Your Voices
                      </h3>
                      <p className="text-gray-500 text-center mt-2 max-w-md">
                        Please log in to view and manage your uploaded voices.
                      </p>
                      <Link href="/login" className="mt-6">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Log In</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
