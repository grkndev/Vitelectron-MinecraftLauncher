import { Minus, X } from "lucide-react";

// Declare the global electronAPI interface
declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => Promise<void>;
      closeWindow: () => Promise<void>;
    };
  }
}

export default function TitleBar() {
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  // Only show TitleBar in Electron environment
  if (!window.electronAPI) {
    return null;
  }

  return (
    <div 
      className="absolute top-0 left-0 flex justify-between items-center py-1 px-2 w-full z-50"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <div className="flex justify-end items-center gap-4 w-full">
        <button 
          onClick={handleMinimize}
          className="w-5 h-5 hover:text-slate-500 flex items-center justify-center text-white text-xs font-bold transition-colors"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          title="Minimize"
        >
          <Minus />
        </button>
        <button 
          onClick={handleClose}
          className="w-5 h-5 hover:text-slate-500  flex items-center justify-center text-white text-xs font-bold transition-colors"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          title="Close"
        >
          <X />
        </button>
      </div>
    </div>
  )
}