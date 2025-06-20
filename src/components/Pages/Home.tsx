import { Loader2, LogOut, Play, Plus, Settings, UserRound, Verified } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Progress } from "../ui/progress"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "../ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "../../contexts/AuthContext"
import { useGameProgress } from "../../contexts/GameProgressContext"
import Announcements from "./Announcements"

export default function Home() {
  const [selectedRam, setSelectedRam] = useState<string>("1024")

  const { user, logout } = useAuth()
  const {
    isLaunching,
    progress,
    progressText,
    downloadSpeed,
    eta,
    currentType,
    isCompleted,
    startLaunch,
    resetProgress
  } = useGameProgress()
  const navigate = useNavigate()

  function handleProgress() {
    // console.log("launching minecraft")
    startLaunch()
  }

  // Format download speed for display
  const formatSpeed = (speed: number): string => {
    if (speed === 0) return ''
    const mbps = speed / (1024 * 1024)
    return `${mbps.toFixed(1)} MB/s`
  }

  // Format ETA for display
  const formatETA = (eta: number): string => {
    if (eta === 0) return ''
    if (eta < 60) return `${Math.round(eta)}s kaldı`
    const minutes = Math.floor(eta / 60)
    const seconds = Math.round(eta % 60)
    return `${minutes}m ${seconds}s kaldı`
  }

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <div className="relative flex flex-col justify-between items-start h-screen bg-gradient-to-tl from-slate-950 to-black p-4">
      {/* Background image with 25% opacity */}
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center opacity-25"></div>

      {/* Settings */}
      <div className="animate-in slide-in-from-top-4 fade-in duration-500 ease-out m-6 flex items-center gap-2 z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 hover:bg-slate-800 hover:text-slate-100"
              tabIndex={0}
            >
              <Settings className="w-8 h-8" />
            </Button>
          </DialogTrigger>
          <DialogContent className="focus:outline-none " onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Ayarlar</DialogTitle>
              <DialogDescription>
                Burada bulunan ayarlarınızı değiştirebilirsiniz.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span>Maksimum RAM: </span>
                <ToggleGroup
                  type="single"
                  className="flex items-center"
                  variant={"outline"}
                  value={selectedRam}
                  onValueChange={setSelectedRam}
                >
                  <ToggleGroupItem value="1024" className="focus:outline-none focus:ring-0 ">
                    1024 MB
                  </ToggleGroupItem>
                  <ToggleGroupItem value="2048" className="focus:outline-none focus:ring-0 ">
                    2048 MB
                  </ToggleGroupItem>
                  <ToggleGroupItem value="4096" className="focus:outline-none focus:ring-0 ">
                    4096 MB
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex items-center gap-2">
                <span>Oyun sürümü: </span>
                <Tooltip >
                  <TooltipTrigger >
                    <Badge
                      variant={"default"}
                      className="bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      tabIndex={0}
                    >
                      <Verified className="w-5 h-5 mr-1" />
                      <span>G-AntiClient 1.20.1</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent >
                    <p>Oyun sürümü ve sistem sürümü eşleşiyor.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 hover:bg-slate-800 hover:text-slate-100"
              onClick={handleLogout}
            >
              <LogOut className="w-8 h-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Çıkış Yap</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Announcements */}
      <div className="w-full z-10">
        <Announcements />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full gap-4 flex flex-col transition-all duration-300">
        {/* Hero */}
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 ease-out w-full flex justify-between items-center ">
          <div className="flex items-center gap-2 text-white border-l-4 border-green-700">
            <UserRound className="w-16 h-16" />
            <div>
              <h6 className="text-sm text-slate-400">Hoşgeldiniz</h6>
              <h1 className="text-6xl font-bold">{user?.username || 'Kullanıcı'}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white border-r-4 border-green-700">
            <button
              onClick={handleProgress}
              disabled={isLaunching}
              className={`bg-transparent hover:bg-black/25  py-8 px-4 min-w-64 gap-4 transition-all duration-300 items-center justify-center flex  cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 ${isCompleted ? 'border-green-400' : ''}`}
              tabIndex={0}
            >
              {
                isLaunching ? (
                  <Loader2 className="w-9 h-9 animate-spin" />
                ) : isCompleted ? (
                  <Loader2 className="w-9 h-9 animate-spin" />
                ) : (
                  <Play className="w-9 h-9 fill-white" />
                )
              }
              <span className="text-4xl font-bold">
                {isLaunching ? (
                  'Yükleniyor'
                ) : isCompleted ? (
                  'Başlatılıyor'
                ) : (
                  'Oyna'
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Animated Progress Bar */}
        {isLaunching && (
          <div className="w-full animate-in slide-in-from-bottom-4 fade-in duration-500 ease-out">
            <div className="mb-2 flex justify-between text-white text-sm">
              <div className="flex flex-col">
                <span>{progressText || 'İlerleme'}</span>
                {currentType && (
                  <span className="text-xs text-slate-400">
                    {currentType === 'LIBRARY' ? 'Kütüphaneler' : 'Paketler'}
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center gap-4">
                <span>{progress}%</span>
                {downloadSpeed > 0 && (
                  <span className="text-xs text-slate-400">
                    {formatSpeed(downloadSpeed)}
                  </span>
                )}
                {eta > 0 && (
                  <span className="text-xs text-slate-400">
                    {formatETA(eta)}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <Progress value={progress} className={`transition-all duration-200 ${progress === 100 ? 'bg-green-600' : ''}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 