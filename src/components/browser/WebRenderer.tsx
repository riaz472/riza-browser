
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';

export function WebRenderer() {
  const { activeUrl, zoom, isDesktopMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeUrl) setIsLoading(true);
  }, [activeUrl]);

  if (!activeUrl) return (
    <div className="flex-1 h-full flex flex-col items-center justify-center bg-slate-50/50">
      <div className="text-center space-y-8">
        <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center mx-auto shadow-xl animate-pulse">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary/30" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-slate-300">Node Grid Standby...</p>
      </div>
    </div>
  );

  const targetSrc = activeUrl.includes('.') && !activeUrl.includes(' ')
    ? (activeUrl.startsWith('http') ? activeUrl : `https://${activeUrl}`)
    : `https://www.google.com/search?q=${encodeURIComponent(activeUrl)}&igu=1`;

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-3xl transition-opacity duration-700">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Routing Traffic...</p>
        </div>
      )}

      <div 
        className="flex-1 w-full h-full origin-top transition-all duration-500 ease-out"
        style={{ 
          transform: `scale(${zoom / 100})`, 
          width: `${(100 / zoom) * 100}%`, 
          height: `${(100 / zoom) * 100}%` 
        }}
      >
        <iframe
          src={targetSrc}
          className={cn(
            "w-full h-full border-none transition-all duration-700",
            !isDesktopMode && "max-w-screen-md mx-auto shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[3rem] my-10"
          )}
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          title="riza-viewport"
        />
      </div>
    </div>
  );
}
