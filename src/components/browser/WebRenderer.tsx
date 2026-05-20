
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Loader2, ShieldAlert, Globe, Lock, RefreshCw } from 'lucide-react';

export function WebRenderer() {
  const { activeUrl, isStealthMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [activeUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!activeUrl) return null;

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-obsidian/90 backdrop-blur-sm">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full border-b-2 border-t-2 ${isStealthMode ? 'border-cyber-crimson' : 'border-cyber-blue'} animate-spin`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className={`w-8 h-8 ${isStealthMode ? 'text-cyber-crimson' : 'text-cyber-blue'} animate-pulse`} />
            </div>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] opacity-40">Decrypting Protocol...</p>
          <div className="mt-2 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${isStealthMode ? 'bg-cyber-crimson' : 'bg-cyber-blue'}`} style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {/* Browser Node Header (Internal View) */}
      <div className="h-8 bg-muted border-b border-white/5 flex items-center px-4 justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-green-500" />
            Node-to-Client Encrypted
          </span>
          <span>Buffer: 1024KB</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Latency: 14ms</span>
          <button onClick={() => window.location.reload()} className="hover:text-foreground transition-colors">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* The Actual Renderer (Iframe Proxy) */}
      <iframe
        src={activeUrl}
        className="flex-1 w-full border-none bg-white"
        onLoad={handleLoad}
        title="Riza Rendering Engine"
        sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      />

      {/* Security Context Overlay */}
      {isStealthMode && (
        <div className="absolute bottom-6 right-6 pointer-events-none">
          <div className="glass-panel border-cyber-crimson/30 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
            <ShieldAlert className="w-5 h-5 text-cyber-crimson" />
            <div className="text-[10px] font-bold uppercase leading-none">
              <div className="text-cyber-crimson mb-1">Stealth Protocol Active</div>
              <div className="opacity-50">Packet obfuscation enabled</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
