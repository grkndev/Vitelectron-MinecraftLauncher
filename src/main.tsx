import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import App from './App.tsx'
import './index.css'
import TitleBar from './components/TitleBar.tsx'

// Use HashRouter for Electron builds, BrowserRouter for development
const Router = window.electronAPI ? HashRouter : BrowserRouter

const isProduction = import.meta.env.PROD

ReactDOM.createRoot(document.getElementById('root')!).render(
  isProduction ? (
    <React.StrictMode>
      <Router>
        <TooltipProvider delayDuration={0}>
          <TitleBar />
          <App />
        </TooltipProvider>
      </Router>
    </React.StrictMode>
  ) : (
    <Router>
      <TooltipProvider delayDuration={0}>
        <TitleBar />
        <App />
      </TooltipProvider>
    </Router>
  )
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
