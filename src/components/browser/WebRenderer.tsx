
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Globe, RefreshCw, Loader2, ShieldAlert } from 'lucide-react';

export function WebRenderer() {
  const { activeUrl, proxiedUrl, isStealthMode, navigate } = useBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (!viewportRef.current) return;
    
    // Initialize Shadow Root if it doesn't exist
    if (!shadowRootRef.current) {
      shadowRootRef.current = viewportRef.current.attachShadow({ mode: 'open' });
    }
  }, []);

  useEffect(() => {
    if (!activeUrl || !proxiedUrl) return;

    let isMounted = true;
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(proxiedUrl);
        if (!response.ok) throw new Error("Gateway Timeout");
        
        const html = await response.text();
        
        if (isMounted && shadowRootRef.current) {
          // Inject the HTML into the Shadow DOM
          shadowRootRef.current.innerHTML = html;
          
          // Intercept all link clicks inside the shadow DOM to keep navigation in-app
          shadowRootRef.current.addEventListener('click', (e) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target && target.href) {
              const href = target.getAttribute('href');
              if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                e.preventDefault();
                try {
                  const absoluteUrl = new URL(href, activeUrl).href;
                  navigate(absoluteUrl);
                } catch (err) {
                  console.error("Navigation intercept failed", err);
                }
              }
            }
          }, true);

          setIsLoading(false);
        }
      } catch (err) {
        console.error("Simulation Engine Failure:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchContent();
    return () => { isMounted = false; };
  }, [proxiedUrl, activeUrl, navigate]);

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
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Simulating DOM Node</p>
        </div>
      )}

      <div className="h-8 bg-muted/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 justify-between text-[9px] font-bold uppercase tracking-widest text-foreground/30 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-green-500/60 font-black">
            <ShieldAlert className="w-3 h-3" />
            NATIVE DOM SIMULATION ACTIVE
          </span>
          <span>NODE: LOCAL-SHADOW-V4</span>
        </div>
        <button onClick={() => navigate(activeUrl)} className="hover:text-foreground transition-colors flex items-center gap-1">
          <RefreshCw className="w-2.5 h-2.5" />
          FORCE RE-RENDER
        </button>
      </div>

      {/* Main Viewport Container */}
      <div 
        ref={viewportRef} 
        className="flex-1 bg-white overflow-y-auto overflow-x-hidden selection:bg-primary/20"
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
