
"use client";

import React, { useState } from 'react';
import { Search, Shield, Ghost, Lock, RefreshCcw, MoreHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';

export function TopBar() {
  const { isStealthMode, toggleStealthMode, setView } = useBrowser();
  const [url, setUrl] = useState('rizabrowser://home');

  return (
    <div className="h-16 flex items-center px-4 gap-4 glass-panel border-b border-white/5 z-50">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto relative group">
        <div className={cn(
          "absolute inset-0 rounded-full transition-all duration-500 opacity-20",
          isStealthMode ? "bg-cyber-crimson animate-crimson-pulse" : "bg-cyber-blue animate-glow-pulse"
        )} />
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-4 h-10 group-focus-within:border-primary/50 transition-all">
          {isStealthMode ? (
            <Ghost className="w-4 h-4 text-cyber-crimson mr-2" />
          ) : (
            <Lock className="w-4 h-4 text-cyber-blue mr-2" />
          )}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-medium"
            onFocus={() => url === 'rizabrowser://home' && setUrl('')}
          />
          <Search className="w-4 h-4 opacity-50" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleStealthMode}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500",
            isStealthMode 
              ? "bg-cyber-crimson/10 border-cyber-crimson text-cyber-crimson shadow-[0_0_15px_rgba(255,51,51,0.3)]"
              : "bg-white/5 border-white/10 hover:border-white/30"
          )}
        >
          <Ghost className={cn("w-4 h-4", isStealthMode && "animate-pulse")} />
          <span className="text-xs font-bold uppercase tracking-wider">
            {isStealthMode ? 'Stealth Active' : 'Go Stealth'}
          </span>
        </button>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <button className="p-2 hover:bg-white/5 rounded-full">
          <Shield className="w-5 h-5 text-cyber-blue" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
