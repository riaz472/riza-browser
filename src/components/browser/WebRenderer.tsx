
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, Loader2, ShieldAlert } from 'lucide-react';

export function WebRenderer() {
  const { activeUrl, navigate, isStealthMode } = useBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Setup proxy URL
  const getProxiedUrl = (url: string) => {
    if (!url) return '';
    // Use DuckDuckGo mirror for search
    if (!url.includes('.') || url.includes(' ')) {
      return `https://html.duckduckgo.com/html/?q=${encodeURIComponent(url)}`;
    }
    // Use our local proxy for direct URLs
    const target = url.startsWith('http') ? url : `https://${url}`;
    return `/api/proxy?url=${encodeURIComponent(target)}`;
  };

  useEffect(() => {
    if (activeUrl) {
      setIsLoading(true);
      setError(null);
    }
  }, [activeUrl]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATE') {
        navigate(event.data.url);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  if (!activeUrl) return (
    <div className="flex-1 h-full flex items-center justify-center bg-obsidian">
      <div className="text-center space-y-4 opacity-20">
        <Globe className="w-16 h-16 mx-auto animate-pulse text-cyber-blue" />
        <p className="text-xs uppercase tracking-[0.4em] font-bold">Waiting for Grid Entry...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md">
          <Loader2 className={`w-12 h-12 ${isStealthMode ? 'text-cyber-crimson' : 'text-cyber-blue'} animate-spin`} />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Decrypting Node Stream...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-obsidian text-white p-8 text-center">
          <ShieldAlert className="w-16 h-16 text-cyber-crimson mb-4" />
          <h3 className="text-xl font-bold mb-2">Connection Blocked</h3>
          <p className="text-sm opacity-50 max-w-md">{error}</p>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={getProxiedUrl(activeUrl)}
        className="flex-1 w-full h-full border-none bg-white"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError("The target node refused the shadow connection. Try a different URL.");
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        title="browser-viewport"
      />

      {isStealthMode && (
        <div className="absolute bottom-4 left-4 pointer-events-none z-30">
          <div className="glass-panel border-cyber-crimson/50 bg-cyber-crimson/10 rounded-xl p-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyber-crimson animate-pulse" />
            <div className="text-[9px] font-bold uppercase text-cyber-crimson tracking-widest">Shadow Route Active</div>
          </div>
        </div>
      )}
    </div>
  );
}
