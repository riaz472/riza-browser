
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, Lock, RefreshCw, ShieldAlert, AlertTriangle } from 'lucide-react';

export function WebRenderer() {
  const { proxiedUrl, activeUrl, isStealthMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (proxiedUrl) {
      setIsLoading(true);
      setError(null);
    }
  }, [proxiedUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!proxiedUrl) return null;

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md">
          <div className="relative mb-8">
            <div className={`w-32 h-32 rounded-full border-b-2 border-t-2 ${isStealthMode ? 'border-cyber-crimson shadow-[0_0_30px_rgba(255,51,51,0.3)]' : 'border-cyber-blue shadow-[0_0_30px_rgba(51,139,255,0.3)]'} animate-spin`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className={`w-10 h-10 ${isStealthMode ? 'text-cyber-crimson' : 'text-cyber-blue'} animate-pulse`} />
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.5em] opacity-60">Riza Proxy Relay Active</p>
            <p className="text-[10px] font-code opacity-30 truncate max-w-md mx-auto">{activeUrl}</p>
          </div>
          <div className="mt-8 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-700 ease-in-out ${isStealthMode ? 'bg-cyber-crimson' : 'bg-cyber-blue'}`} style={{ width: '75%' }} />
          </div>
        </div>
      )}

      {/* Internal Browser Status Bar */}
      <div className="h-10 bg-muted border-b border-white/5 flex items-center px-4 justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40 shrink-0 z-10">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-green-500/80">
            <Lock className="w-3.5 h-3.5" />
            End-to-End Encrypted Node
          </span>
          <span className="opacity-40">Identity: {isStealthMode ? 'Ghost Node' : 'Verified Client'}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Proxy Latency: 22ms</span>
          </div>
          <button onClick={() => window.location.reload()} className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            Refresh Stream
          </button>
        </div>
      </div>

      {/* Secure Rendering Viewport */}
      <div className="flex-1 bg-white relative">
        <iframe
          src={proxiedUrl}
          className="w-full h-full border-none bg-white"
          onLoad={handleLoad}
          title="Riza Virtual Rendering Context"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>

      {/* Stealth Status Overlay */}
      {isStealthMode && (
        <div className="absolute bottom-6 left-6 pointer-events-none z-30">
          <div className="glass-panel border-cyber-crimson/50 bg-cyber-crimson/5 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_20px_rgba(255,51,51,0.2)]">
            <ShieldAlert className="w-5 h-5 text-cyber-crimson" />
            <div className="text-[10px] font-bold uppercase leading-tight">
              <div className="text-cyber-crimson mb-1">Packet Obfuscation Active</div>
              <div className="opacity-40 tracking-tighter">IP Address Spoofer: Enabled</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
