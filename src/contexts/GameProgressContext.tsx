import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

interface ProgressData {
  total: { amount: number; size: number }
  downloaded: { amount: number; size: number }
  speed: number
  eta: number
  type: 'LIBRARY' | 'ASSETS'
}

interface LaunchData {
  total: { amount: number; size: number }
}

interface GameProgressContextType {
  isLaunching: boolean
  progress: number
  progressText: string
  downloadSpeed: number
  eta: number
  currentType: 'LIBRARY' | 'ASSETS' | null
  isCompleted: boolean
  startLaunch: () => void
  resetProgress: () => void
}

const GameProgressContext = createContext<GameProgressContextType | undefined>(undefined)

interface GameProgressProviderProps {
  children: ReactNode
}

export function GameProgressProvider({ children }: GameProgressProviderProps) {
  const [isLaunching, setIsLaunching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')
  const [downloadSpeed, setDownloadSpeed] = useState(0)
  const [eta, setEta] = useState(0)
  const [currentType, setCurrentType] = useState<'LIBRARY' | 'ASSETS' | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [totalSize, setTotalSize] = useState(0)

  // Throttle function to prevent too frequent UI updates
  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    let lastExecTime = 0
    
    return (...args: any[]) => {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func(...args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func(...args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }, [])

  // Throttled progress update function (100ms delay)
  const updateProgress = useCallback(
    throttle((progressData: ProgressData) => {
      if (totalSize > 0) {
        const percentage = Math.round((progressData.downloaded.size / totalSize) * 100)
        setProgress(Math.min(percentage, 100))
      }
      
      setDownloadSpeed(progressData.speed)
      setEta(progressData.eta)
      setCurrentType(progressData.type)
      
      // Update progress text based on type
      const typeText = progressData.type === 'LIBRARY' ? 'Kütüphaneler' : 'Varlıklar'
      setProgressText(`${typeText} indiriliyor...`)
    }, 100),
    [totalSize, throttle]
  )

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ipcRenderer) {
      // Listen for launch download start
      window.ipcRenderer.on('launch-download', (_: any, data: LaunchData) => {
        // //console.log('Launch download event:', data)
        
        if (data.total.size > 0) {
          // New version needs to be downloaded
          setTotalSize(data.total.size)
          setProgressText('İndirme başlatılıyor...')
          setProgress(0)
          setIsCompleted(false)
        } else {
          // Existing version, no download needed
          setProgressText('Mevcut sürüm yükleniyor...')
          setProgress(100)
          setTimeout(() => {
            setIsCompleted(true)
            setIsLaunching(false)
          }, 1000)
        }
      })

      // Listen for download progress
      window.ipcRenderer.on('download-progress', (_: any, data: ProgressData) => {
        updateProgress(data)
      })

      // Listen for download end
      window.ipcRenderer.on('download-end', () => {
        //console.log('Download end:', data)
        setProgress(100)
        setProgressText('İndirme tamamlandı')
      })

      // Listen for launch success
      window.ipcRenderer.on('launch-success', (_: any) => {
        //console.log('Launch success')
        setProgress(100)
        setProgressText('Oyun başlatıldı!')
        setIsCompleted(true)
        
        // Reset after a short delay
        // setTimeout(() => {
        //   resetProgress()
        // }, 2000)

        setTimeout(() => {
          window.electronAPI.closeWindow();
        }, 4000)
      })

      // Listen for launch error
      window.ipcRenderer.on('launch-error', (_: any, error: any) => {
        console.error('Launch error:', error)
        setProgressText('Hata oluştu!')
        setIsLaunching(false)
        setIsCompleted(false)
      })

      return () => {
        if (window.ipcRenderer) {
          // Clean up all listeners - removed to avoid parameter issues
        }
      }
    }
  }, [updateProgress])

  const startLaunch = () => {
    if (!isLaunching) {
      setIsLaunching(true)
      setProgress(0)
      setProgressText('Başlatılıyor...')
      setDownloadSpeed(0)
      setEta(0)
      setCurrentType(null)
      setIsCompleted(false)
      setTotalSize(0)
      
      // Call the electron API to start minecraft
      if (window.electronAPI && (window.electronAPI as any).launchMinecraft) {
        (window.electronAPI as any).launchMinecraft()
      }
    }
  }

  const resetProgress = () => {
    setIsLaunching(false)
    setProgress(0)
    setProgressText('')
    setDownloadSpeed(0)
    setEta(0)
    setCurrentType(null)
    setIsCompleted(false)
    setTotalSize(0)
  }

  const value: GameProgressContextType = {
    isLaunching,
    progress,
    progressText,
    downloadSpeed,
    eta,
    currentType,
    isCompleted,
    startLaunch,
    resetProgress
  }

  return (
    <GameProgressContext.Provider value={value}>
      {children}
    </GameProgressContext.Provider>
  )
}

export function useGameProgress() {
  const context = useContext(GameProgressContext)
  if (context === undefined) {
    throw new Error('useGameProgress must be used within a GameProgressProvider')
  }
  return context
}

 