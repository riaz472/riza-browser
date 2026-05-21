
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

const InlineIcon = ({ d, size = 20, color = "currentColor", className = "" }: { d: string, size?: number, color?: string, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

export function TopBar() {
  const { 
    navigate, activeUrl, setView, currentView, 
    zoom, setZoom, isDesktopMode, setDesktopMode,
    isStealthMode, toggleStealthMode
  } = useBrowser();
  
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setInputValue(activeUrl || (currentView === 'home' ? 'rizabrowser://home' : ''));
  }, [activeUrl, currentView]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') navigate(inputValue);
  };

  const handleClearData = () => {
    if (confirm("Purge browser session and local node cache?")) {
      window.location.reload();
    }
  };

  return (
    <div className="h-20 flex items-center px-8 gap-8 glass-panel border-b border-slate-200/50 z-50 shrink-0 bg-white/95">
      <div className="flex items-center gap-2">
        <button onClick={() => setView('home')} className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900">
          <InlineIcon d="M19 12H5 M12 19l-7-7 7-7" />
        </button>
        <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-200 cursor-not-allowed">
          <InlineIcon d="M5 12h14 M12 5l7 7-7 7" />
        </button>
        <button onClick={() => navigate(activeUrl)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900">
          <InlineIcon d="M23 4v6h-6 M20.49 15a9 9 0 11-2.12-9.36L23 10" />
        </button>
      </div>

      <div className="flex-1 max-w-4xl mx-auto relative">
        <div className="relative flex items-center bg-slate-100/60 border border-slate-200 rounded-[1.5rem] px-6 h-12 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <div className="mr-4 flex items-center opacity-40">
            {activeUrl?.startsWith('https') ? (
              <InlineIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={14} color="#22c55e" />
            ) : (
              <InlineIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={14} />
            )}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-700 tracking-tight"
            placeholder="Search grid or enter address..."
          />
          <InlineIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" size={16} className="opacity-40" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleStealthMode}
          className={cn(
            "flex items-center gap-3 px-6 py-2.5 rounded-2xl border transition-all duration-700 font-black text-[10px] uppercase tracking-[0.2em]",
            isStealthMode ? "bg-red-500 border-red-600 text-white shadow-xl shadow-red-500/30" : "bg-white border-slate-200 hover:border-slate-400 text-slate-600"
          )}
        >
          <div className={cn("w-2 h-2 rounded-full", isStealthMode ? "bg-white animate-pulse" : "bg-slate-300")} />
          {isStealthMode ? 'Ghost Active' : 'Go Stealth'}
        </button>

        <div className="w-px h-8 bg-slate-200 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-600">
              <InlineIcon d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-[2.5rem] p-6 glass-panel border-slate-200 shadow-2xl">
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: 'New', d: "M12 5v14M5 12h14", color: "text-primary", action: () => navigate('https://google.com') },
                { label: 'Incog', d: "M17 11V7a5 5 0 0 0-10 0v4 M12 11v4", color: "text-slate-900", action: () => toggleStealthMode() },
                { label: 'Shell', d: "M4 17l6-6-6-6 M12 19h8", color: "text-accent", action: () => setView('terminal') },
                { label: 'Vault', d: "M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4M4 6v12c0 1.1.9 2 2 2h14v-4M16 12h4", color: "text-green-500", action: () => setView('wallet') },
              ].map((btn, i) => (
                <button key={i} onClick={btn.action} className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 transition-all hover:scale-105 group shadow-sm">
                  <div className={btn.color}><InlineIcon d={btn.d} size={20} /></div>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">{btn.label}</span>
                </button>
              ))}
            </div>

            <DropdownMenuSeparator className="my-4 bg-slate-100" />
            
            <DropdownMenuItem onClick={() => setView('terminal')} className="rounded-2xl py-4 px-4 cursor-pointer focus:bg-slate-50">
              <div className="flex items-center gap-4">
                <InlineIcon d="M4 17l6-6-6-6 M12 19h8" size={16} color="#338BFF" />
                <span className="font-bold text-sm">Bash Terminal</span>
              </div>
            </DropdownMenuItem>

            <div className="px-4 py-4 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <InlineIcon d="M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7" size={16} />
                  <span className="text-sm font-bold">Zoom Scale</span>
                </div>
                <span className="text-xs font-black text-primary">{zoom}%</span>
              </div>
              <Slider 
                value={[zoom]} 
                onValueChange={(v) => setZoom(v[0])} 
                min={50} max={200} step={10}
              />
            </div>

            <DropdownMenuSeparator className="my-4 bg-slate-100" />

            <div className="px-4 pb-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 px-1">
                  <InlineIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" size={16} />
                  <span className="text-sm font-bold">Find in Node</span>
                </div>
                <input 
                  type="text" 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Type to highlight..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-xs outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <DropdownMenuSeparator className="my-4 bg-slate-100" />

            <DropdownMenuItem onClick={() => setDesktopMode(!isDesktopMode)} className="rounded-2xl py-4 px-4 cursor-pointer focus:bg-slate-50">
              <div className="flex items-center gap-4">
                <InlineIcon d="M2 2h20v15H2V2z M2 17h20v5H2v-5z" size={16} />
                <span className="font-bold text-sm">{isDesktopMode ? 'Mobile Agent' : 'Desktop Agent'}</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setView('settings')} className="rounded-2xl py-4 px-4 cursor-pointer focus:bg-slate-50">
              <div className="flex items-center gap-4">
                <InlineIcon d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" size={16} />
                <span className="font-bold text-sm">Preferences</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleClearData} className="rounded-2xl py-4 px-4 cursor-pointer focus:bg-red-50 text-red-500">
              <div className="flex items-center gap-4">
                <InlineIcon d="M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" size={16} />
                <span className="font-bold text-sm">Purge Cache</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
