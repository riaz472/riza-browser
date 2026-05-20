
"use client";

import React from 'react';
import { LayoutDashboard, Code, ShieldCheck, Terminal, Settings, Puzzle, Cpu, Globe, Activity } from 'lucide-react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';

const RizaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M20 20H55C70 20 80 30 80 45C80 60 70 70 55 70H20V80" 
      stroke="currentColor" 
      strokeWidth="12" 
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path 
      d="M20 45H50" 
      stroke="currentColor" 
      strokeWidth="12" 
      strokeLinecap="round"
    />
    <path 
      d="M50 70L80 90" 
      stroke="currentColor" 
      strokeWidth="12" 
      strokeLinecap="round"
    />
    <circle cx="50" cy="45" r="5" fill="currentColor" className="animate-pulse" />
  </svg>
);

export function Sidebar() {
  const { currentView, setView, isStealthMode } = useBrowser();

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyzer', label: 'Web Scraper', icon: Code },
    { id: 'terminal', label: 'JS Terminal', icon: Terminal },
    { id: 'extensions', label: 'Extensions', icon: Puzzle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 glass-panel border-r border-white/5 flex flex-col h-full z-40">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700",
            isStealthMode 
              ? "shadow-[0_0_20px_rgba(255,51,51,0.4)] border border-cyber-crimson/50 text-cyber-crimson bg-cyber-crimson/5" 
              : "shadow-[0_0_20px_rgba(51,139,255,0.4)] border border-cyber-blue/50 text-cyber-blue bg-cyber-blue/5"
          )}>
            <RizaLogo />
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl tracking-tight leading-none">riza</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold mt-1">v4.0.1 Stable</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
                  isActive 
                    ? (isStealthMode ? "bg-cyber-crimson/10 text-cyber-crimson" : "bg-cyber-blue/10 text-cyber-blue") 
                    : "text-foreground/50 hover:text-foreground hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full shadow-[0_0_10px_currentColor]",
                    isStealthMode ? "bg-cyber-crimson" : "bg-cyber-blue"
                  )} />
                )}
                <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                <span className="text-sm font-bold tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-white/5 rounded-3xl p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Grid Link</span>
            </div>
            <span className="text-[10px] font-bold text-cyber-blue uppercase">Stable</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-cyber-blue w-[85%] animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-obsidian bg-muted flex items-center justify-center overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">1.2k Nodes Online</span>
        </div>
      </div>
    </div>
  );
}
