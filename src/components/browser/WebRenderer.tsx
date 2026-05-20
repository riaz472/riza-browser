"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, Loader2, Smartphone, Monitor } from 'lucide-react';

export function WebRenderer() {
  const { activeUrl, isStealthMode, zoom, isDesktopMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeUrl) {
      setIsLoading(true);
    }
  }, [activeUrl]);

  if (!activeUrl) return (
    <div className="flex-1 h-full flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 opacity-20">
        <Globe className="w-20 h-20 mx-auto animate-pulse text-primary" />
        <p className="text-[10px] uppercase tracking-[0.5em] font-black">Node Grid Idle...</p>
      </div>
    </div>
  );

  const isUrl = activeUrl.includes('.') && !activeUrl.includes(' ');
  const targetSrc = isUrl 
    ? `https://www.google.com/search?igu=1&q=${encodeURIComponent(activeUrl)}`
    : `https://html.duckduckgo.com/html/?q=${encodeURIComponent(activeUrl)}`;

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Authenticating Stream...</p>
        </div>
      )}

      <div 
        className="flex-1 w-full h-full origin-top transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom / 100})`, width: `${(100 / zoom) * 100}%`, height: `${(100 / zoom) * 100}%` }}
      >
        <iframe
          src={targetSrc}
          className={cn(
            "w-full h-full border-none transition-all duration-500",
            isDesktopMode ? "max-w-none" : "max-w-screen-md mx-auto shadow-2xl"
          )}
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          title="riza-viewport"
        />
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-4 pointer-events-none z-30">
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 bg-white/80">
          {isDesktopMode ? <Monitor className="w-4 h-4 text-primary" /> : <Smartphone className="w-4 h-4 text-primary" />}
          <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">
            {isDesktopMode ? 'Desktop Emulation' : 'Mobile Emulation'}
          </div>
        </div>
        
        {isStealthMode && (
          <div className="glass-panel border-red-500/50 bg-red-500/10 px-4 py-2 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="text-[9px] font-black uppercase text-red-500 tracking-widest">Ghost Route Active</div>
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}