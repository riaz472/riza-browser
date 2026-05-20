
"use client";

import React, { useState, useEffect } from 'react';
import { Search, Shield, Ghost, Lock, RefreshCcw, MoreHorizontal, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';

export function TopBar() {
  const { isStealthMode, toggleStealthMode, activeUrl, navigate, setView, currentView } = useBrowser();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (activeUrl) {
      setInputValue(activeUrl);
    } else if (currentView === 'home') {
      setInputValue('rizabrowser://home');
    }
  }, [activeUrl, currentView]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(inputValue);
    }
  };

  return (
    <div className="h-16 flex items-center px-4 gap-4 glass-panel border-b border-white/5 z-50 shrink-0">
      <div className="flex items-center gap-2">
        <button onClick={() => setView('home')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-foreground/40 hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors opacity-20 cursor-not-allowed">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={() => navigate(activeUrl)} 
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-foreground/40 hover:text-foreground"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto relative group">
        <div className={cn(
          "absolute inset-0 rounded-full transition-all duration-500 opacity-20 pointer-events-none",
          isStealthMode ? "bg-cyber-crimson animate-crimson-pulse" : "bg-cyber-blue animate-glow-pulse"
        )} />
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-4 h-11 group-focus-within:border-primary/50 transition-all shadow-inner">
          {activeUrl ? (
            <div className="mr-3 flex items-center">
              {activeUrl.startsWith('https') ? (
                <Lock className="w-4 h-4 text-green-500" />
              ) : (
                <Shield className="w-4 h-4 text-yellow-500" />
              )}
            </div>
          ) : (
            <Globe className="w-4 h-4 text-cyber-blue mr-3 opacity-50" />
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search the matrix or enter URL..."
            className="flex-1 bg-transparent outline-none text-sm font-code font-medium tracking-tight"
            onFocus={() => inputValue === 'rizabrowser://home' && setInputValue('')}
          />
          <Search className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleStealthMode}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500",
            isStealthMode 
              ? "bg-cyber-crimson/10 border-cyber-crimson text-cyber-crimson shadow-[0_0_15px_rgba(255,51,51,0.3)]"
              : "bg-white/5 border-white/10 hover:border-white/30"
          )}
        >
          <Ghost className={cn("w-4 h-4", isStealthMode && "animate-pulse")} />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
            {isStealthMode ? 'Stealth Active' : 'Go Stealth'}
          </span>
        </button>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <button className="p-2 hover:bg-white/5 rounded-full relative">
          <Shield className="w-5 h-5 text-cyber-blue" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-obsidian" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
