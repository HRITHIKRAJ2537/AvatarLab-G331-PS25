"use client"

import React, { useState, useMemo } from "react"
import { Search, Play, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEmail } from "@/lib/authenticate"
import { toast } from 'react-toastify'
import { motion } from "framer-motion"
import { pageVariants, videoVariants } from "@/lib/animations"

type VideoType = { id: string; filename: string; video: string; duration: string; date: string }

export default function MyVideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [videos, setVideos] = useState<VideoType[]>([])
  const [openVideo, setOpenVideo] = useState<VideoType | null>(null)
  const [email, setEmail] = useState("")

  React.useEffect(() => {
    const retrieveVideos = async () => {
      const result = await getEmail()
      setEmail(result!.email)
      const response = await fetch('/api/user/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: result?.email }),
      })
      if (response.ok) {
        const data = await response.json()
        setVideos(data)
      }
    }
    retrieveVideos()
  }, [])

  const handleDownload = (videoUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('api/user/trash-toggle', {
        method: "POST",
        body: JSON.stringify({ email: email, videoID: id, role: "delete" })
      })
      const { message } = await response.json()
      if (response.ok) {
        setVideos(prev => prev.filter(video => video.id !== id))
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const sortedVideos = useMemo(() => {
    const filtered = videos.filter((video) =>
      video.filename.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "a-z") return a.filename.localeCompare(b.filename)
      if (sortBy === "z-a") return b.filename.localeCompare(a.filename)
      return 0
    })
  }, [videos, searchQuery, sortBy])

  return (
    <motion.div className="container mx-auto p-2" {...pageVariants}>
      <div className="p-0 sm:p-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          My Videos
        </h1>
        <p className="text-muted-foreground text-sm">Manage your generated videos</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search videos"
            className="w-full pl-8 py-2 rounded border border-green-200 focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring-0 text-xs sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-green-200 dark:border-green-800">
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

      <motion.div {...videoVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 static sm:mr-2">
  {sortedVideos.map((video) => (
    <motion.div
      key={video.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative flex items-center gap-4 rounded-sm border hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-md p-4"
    >
      <div className="relative h-40 w-36 overflow-hidden">
        <video
          src={video.video}
          className="h-full w-full object-cover rounded-sm"
          muted
          preload="metadata"
        />
        <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
          {video.duration}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-green-800 dark:text-green-300 text-xs md:text-sm">
          {video.filename}
        </h3>
        <p className="text-xs text-muted-foreground mt-2">{video.date}</p>
      </div>

      <div className="absolute bottom-1 right-1 flex items-center gap-1 sm:static sm:mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenVideo(video)}
          className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
        >
          <Play className="h-2 w-2 sm:h-4 sm:w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDownload(video.video, video.filename)}
          className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
        >
          <Download className="h-2 w-2 sm:h-4 sm:w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(video.id)}
          className="h-6 w-6 sm:h-8 sm:w-8 text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-900/30"
        >
          <Trash2 className="h-2 w-2 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </motion.div>
  ))}
</motion.div>

      {openVideo && (
        <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
          <DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none">
            <video
              src={openVideo.video}
              controls
              width={400}
              height={400}
              autoPlay
              className="w-full h-full object-contain rounded-sm"
            />
          </DialogContent>
        </Dialog>
      )}</div>
    </motion.div>
  )
}
