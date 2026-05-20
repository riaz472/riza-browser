"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, Lock, RefreshCw, ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';

export function WebRenderer() {
  const { proxiedUrl, activeUrl, isStealthMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // When the proxied URL changes, reset states
  useEffect(() => {
    if (proxiedUrl) {
      setIsLoading(true);
      setError(null);
    }
  }, [proxiedUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError("Virtual node failed to establish connection. The target host might be blocking proxy relays.");
    setIsLoading(false);
  };

  if (!proxiedUrl) return (
    <div className="flex-1 h-full flex items-center justify-center bg-obsidian">
      <div className="text-center space-y-4 opacity-20">
        <Globe className="w-16 h-16 mx-auto animate-pulse" />
        <p className="text-xs uppercase tracking-[0.4em] font-bold">Waiting for Navigation...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {/* Loading Overlay */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md transition-all duration-500">
          <div className="relative mb-8">
            <div className={`w-32 h-32 rounded-full border-b-2 border-t-2 ${isStealthMode ? 'border-cyber-crimson shadow-[0_0_30px_rgba(255,51,51,0.3)]' : 'border-cyber-blue shadow-[0_0_30px_rgba(51,139,255,0.3)]'} animate-spin`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className={`w-10 h-10 ${isStealthMode ? 'text-cyber-crimson' : 'text-cyber-blue'} animate-spin`} />
            </div>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em]">Synchronizing Node</h3>
            <p className="text-[10px] font-code opacity-40 truncate max-w-md mx-auto px-6">{activeUrl}</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-obsidian p-8 text-center">
          <AlertCircle className="w-16 h-16 text-cyber-crimson mb-6" />
          <h3 className="text-xl font-headline font-bold mb-2">Node Relay Failure</h3>
          <p className="text-sm text-foreground/50 max-w-md mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Reconnect to Grid
          </button>
        </div>
      )}

      {/* Internal Browser Status Bar */}
      <div className="h-10 bg-muted border-b border-white/5 flex items-center px-4 justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/40 shrink-0 z-10">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-green-500/80">
            <Lock className="w-3.5 h-3.5" />
            TLS 1.3 SECURE
          </span>
          <span className="opacity-40">Identity: {isStealthMode ? 'Ghost Node' : 'Verified Agent'}</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Latency: 14ms</span>
          </div>
          <button onClick={() => {
            if (iframeRef.current) iframeRef.current.src = proxiedUrl;
          }} className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            Hard Refresh
          </button>
        </div>
      </div>

      {/* Secure Rendering Viewport */}
      <div className="flex-1 bg-white relative">
        <iframe
          ref={iframeRef}
          src={proxiedUrl}
          className="w-full h-full border-none bg-white"
          onLoad={handleLoad}
          onError={handleError}
          title="Riza Virtual Rendering Context"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        />
      </div>

      {/* Stealth Status Indicator */}
      {isStealthMode && (
        <div className="absolute bottom-6 left-6 pointer-events-none z-30 animate-in slide-in-from-left-4 duration-700">
          <div className="glass-panel border-cyber-crimson/50 bg-cyber-crimson/5 rounded-2xl p-4 flex items-center gap-3 shadow-[0_0_20px_rgba(255,51,51,0.2)]">
            <ShieldAlert className="w-5 h-5 text-cyber-crimson" />
            <div className="text-[10px] font-bold uppercase leading-tight">
              <div className="text-cyber-crimson mb-1">Packet Obfuscation Active</div>
              <div className="opacity-40 tracking-tighter">Routing via TOR-Exit-Node-7</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
