"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Shield, Ghost, Lock, RefreshCcw, 
  MoreVertical, ArrowLeft, ArrowRight, Globe,
  Plus, ShieldAlert, History, Bookmark, 
  Settings, HelpCircle, Download, Share2, 
  Maximize, Languages, Smartphone, Trash2,
  Terminal, Wallet, Layers, Palette, ZoomIn, SearchCode
} from 'lucide-react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

export function TopBar() {
  const { 
    isStealthMode, toggleStealthMode, activeUrl, navigate, 
    setView, currentView, zoom, setZoom, isDesktopMode, setDesktopMode,
    setWallpaper
  } = useBrowser();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (activeUrl) {
      setInputValue(activeUrl);
    } else if (currentView === 'home') {
      setInputValue('rizabrowser://home');
    }
  }, [activeUrl, currentView]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') navigate(inputValue);
  };

  const handleWallpaperChange = () => {
    const url = prompt("Enter Image or Video URL:");
    if (url) {
      const type = (url.endsWith('.mp4') || url.endsWith('.webm')) ? 'video' : 'image';
      setWallpaper({ type, url });
    }
  };

  return (
    <div className="h-20 flex items-center px-6 gap-6 glass-panel border-b border-slate-200/50 z-50 shrink-0 bg-white/90">
      <div className="flex items-center gap-1">
        <button onClick={() => setView('home')} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all opacity-30 cursor-not-allowed">
          <ArrowRight className="w-5 h-5" />
        </button>
        <button 
          onClick={() => navigate(activeUrl)} 
          className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 max-w-3xl mx-auto relative">
        <div className="relative flex items-center bg-slate-100/50 border border-slate-200 rounded-2xl px-5 h-12 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all group">
          <div className="mr-3 flex items-center">
            {activeUrl?.startsWith('https') ? (
              <Lock className="w-4 h-4 text-green-500" />
            ) : (
              <Globe className="w-4 h-4 text-primary opacity-50" />
            )}
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Explore the grid or enter a node address..."
            className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-700 tracking-tight"
            onFocus={() => inputValue === 'rizabrowser://home' && setInputValue('')}
          />
          <Search className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleStealthMode}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-500",
            isStealthMode 
              ? "bg-red-500 border-red-600 text-white shadow-lg shadow-red-500/30"
              : "bg-white border-slate-200 hover:border-slate-400"
          )}
        >
          <Ghost className={cn("w-4 h-4", isStealthMode && "animate-pulse")} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {isStealthMode ? 'Ghost Enabled' : 'Go Stealth'}
          </span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-600">
              <MoreVertical className="w-6 h-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 rounded-[2rem] p-3 glass-panel border-slate-200">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { icon: Plus, label: 'New', action: () => navigate('https://google.com') },
                { icon: ShieldAlert, label: 'Incog', action: () => toggleStealthMode() },
                { icon: Terminal, label: 'Shell', action: () => setView('terminal') },
                { icon: Wallet, label: 'Pay', action: () => setView('wallet') },
              ].map((btn, i) => (
                <button key={i} onClick={btn.action} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 hover:bg-primary/10 transition-colors group">
                  <btn.icon className="w-5 h-5 text-slate-500 group-hover:text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{btn.label}</span>
                </button>
              ))}
            </div>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => setView('terminal')} className="rounded-xl py-3 cursor-pointer">
              <Terminal className="w-4 h-4 mr-3 text-primary" />
              <span className="font-bold text-sm">Launch Termux Shell</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-xl py-3">
                <Palette className="w-4 h-4 mr-3 text-accent" />
                <span className="font-bold text-sm">Theme & Wallpaper</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="glass-panel rounded-2xl p-2 min-w-[200px]">
                <DropdownMenuItem onClick={handleWallpaperChange} className="rounded-xl">Custom Background</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl">Light/Dark Sync</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ZoomIn className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold">Zoom Scale</span>
                </div>
                <span className="text-xs font-black text-primary">{zoom}%</span>
              </div>
              <Slider 
                value={[zoom]} 
                onValueChange={(v) => setZoom(v[0])} 
                min={50} max={200} step={10}
                className="cursor-pointer"
              />
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
              <History className="w-4 h-4 mr-3 text-slate-400" />
              <span className="font-bold text-sm">History Logs</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer">
              <Bookmark className="w-4 h-4 mr-3 text-slate-400" />
              <span className="font-bold text-sm">Saved Nodes</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setDesktopMode(!isDesktopMode)} className="rounded-xl py-3 cursor-pointer">
              <Smartphone className="w-4 h-4 mr-3 text-slate-400" />
              <span className="font-bold text-sm">{isDesktopMode ? 'Mobile View' : 'Desktop Site'}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setView('settings')} className="rounded-xl py-3 cursor-pointer">
              <Settings className="w-4 h-4 mr-3 text-slate-400" />
              <span className="font-bold text-sm">System Preferences</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl py-3 cursor-pointer text-red-500 hover:bg-red-50 focus:bg-red-50">
              <Trash2 className="w-4 h-4 mr-3" />
              <span className="font-bold text-sm">Clear Cache Data</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}