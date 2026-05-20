
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, Loader2 } from 'lucide-react';

export function WebRenderer() {
  const { activeUrl, proxiedUrl, isStealthMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (proxiedUrl) {
      setIsLoading(true);
    }
  }, [proxiedUrl]);

  if (!activeUrl) return (
    <div className="flex-1 h-full flex items-center justify-center bg-obsidian">
      <div className="text-center space-y-4 opacity-20">
        <Globe className="w-16 h-16 mx-auto animate-pulse" />
        <p className="text-xs uppercase tracking-[0.4em] font-bold">Waiting for Grid Entry...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md">
          <Loader2 className={`w-12 h-12 ${isStealthMode ? 'text-cyber-crimson' : 'text-cyber-blue'} animate-spin`} />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Connecting to Remote Node</p>
        </div>
      )}

      {/* Full Viewport Iframe */}
      <iframe
        src={proxiedUrl}
        className="flex-1 w-full h-full border-none bg-white"
        onLoad={() => setIsLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        title="browser-viewport"
      />

      {isStealthMode && (
        <div className="absolute bottom-4 left-4 pointer-events-none z-30">
          <div className="glass-panel border-cyber-crimson/50 bg-cyber-crimson/10 rounded-xl p-3 flex items-center gap-3 shadow-[0_0_20px_rgba(255,51,51,0.1)]">
            <div className="w-2 h-2 rounded-full bg-cyber-crimson animate-pulse" />
            <div className="text-[9px] font-bold uppercase text-cyber-crimson tracking-widest">Stealth Shadow Route Active</div>
          </div>
        </div>
      )}
    </div>
  );
}
