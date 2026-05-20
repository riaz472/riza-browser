
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, Lock, RefreshCw, ShieldAlert, Loader2 } from 'lucide-react';

export function WebRenderer() {
  const { proxiedUrl, activeUrl, isStealthMode, navigate } = useBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NAVIGATE' && event.data?.url) {
        navigate(event.data.url);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  useEffect(() => {
    if (!proxiedUrl) {
      setHtmlContent('');
      setIsLoading(false);
      return;
    }

    // Direct embed for search mirrors
    if (proxiedUrl.includes('duckduckgo.com/html/')) {
      setHtmlContent('');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(proxiedUrl);
        if (!response.ok) throw new Error("Gateway Timeout");
        
        let html = await response.text();
        
        // Inject absolute base tag and navigation bridge
        const injection = `
          <base href="${activeUrl}">
          <script>
            window.onerror = function() { return true; };
            document.addEventListener('click', function(e) {
              let target = e.target.closest('a');
              if(target && target.href) {
                const href = target.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                  e.preventDefault();
                  try {
                    const abs = new URL(href, window.location.href).href;
                    window.parent.postMessage({ type: 'NAVIGATE', url: abs }, '*');
                  } catch(err) {}
                }
              }
            }, true);
          </script>
        `;
        
        html = html.replace('<head>', `<head>${injection}`);

        if (isMounted) {
          setHtmlContent(html);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchContent();
    return () => { isMounted = false; };
  }, [proxiedUrl, activeUrl]);

  const handleRefresh = () => navigate(activeUrl);

  if (!proxiedUrl) return (
    <div className="flex-1 h-full flex items-center justify-center bg-obsidian">
      <div className="text-center space-y-4 opacity-20">
        <Globe className="w-16 h-16 mx-auto animate-pulse" />
        <p className="text-xs uppercase tracking-[0.4em] font-bold">Waiting for Grid Entry...</p>
      </div>
    </div>
  );

  const isSearchMirror = proxiedUrl.includes('duckduckgo.com/html/');

  return (
    <div className="flex-1 h-full flex flex-col bg-white overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md">
          <Loader2 className={`w-12 h-12 ${isStealthMode ? 'text-cyber-crimson' : 'text-cyber-blue'} animate-spin`} />
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Syncing Node</p>
        </div>
      )}

      <div className="h-8 bg-muted/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 justify-between text-[9px] font-bold uppercase tracking-widest text-foreground/30 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-green-500/60">
            <Lock className="w-3 h-3" />
            SECURE RELAY
          </span>
          <span>GATEWAY: {isSearchMirror ? 'DDG-DIRECT' : 'ALLORIGINS-CORS'}</span>
        </div>
        <button onClick={handleRefresh} className="hover:text-foreground transition-colors flex items-center gap-1">
          <RefreshCw className="w-2.5 h-2.5" />
          FORCE SYNC
        </button>
      </div>

      <div className="flex-1 bg-white relative">
        <iframe
          ref={iframeRef}
          src={isSearchMirror ? proxiedUrl : undefined}
          srcDoc={!isSearchMirror ? htmlContent : undefined}
          className="w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      {isStealthMode && (
        <div className="absolute bottom-4 left-4 pointer-events-none z-30">
          <div className="glass-panel border-cyber-crimson/50 bg-cyber-crimson/10 rounded-xl p-3 flex items-center gap-3 shadow-[0_0_20px_rgba(255,51,51,0.1)]">
            <ShieldAlert className="w-4 h-4 text-cyber-crimson" />
            <div className="text-[9px] font-bold uppercase text-cyber-crimson">Stealth Routing Active</div>
          </div>
        </div>
      )}
    </div>
  );
}
