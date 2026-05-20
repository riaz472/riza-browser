
"use client";

import React from 'react';
import { LayoutDashboard, Code, ShieldCheck, Terminal, Settings, Puzzle, Cpu, Globe, Activity } from 'lucide-react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Sidebar() {
  const { currentView, setView, isStealthMode } = useBrowser();
  const logoImage = PlaceHolderImages.find(img => img.id === 'riza-logo') || PlaceHolderImages[0];

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
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 overflow-hidden",
            isStealthMode ? "shadow-[0_0_20px_rgba(255,51,51,0.4)] border border-cyber-crimson/50" : "shadow-[0_0_20px_rgba(51,139,255,0.4)] border border-cyber-blue/50"
          )}>
            <img 
              src={logoImage.imageUrl} 
              alt="Riza Logo" 
              className="w-full h-full object-cover" 
              data-ai-hint={logoImage.imageHint}
            />
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl tracking-tight leading-none">rizabrowser</h1>
            <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold mt-1">Version 4.0.1</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                  isActive 
                    ? (isStealthMode ? "bg-cyber-crimson/10 text-cyber-crimson" : "bg-cyber-blue/10 text-cyber-blue") 
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full",
                    isStealthMode ? "bg-cyber-crimson" : "bg-cyber-blue"
                  )} />
                )}
                <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-blue" />
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">System Health</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-tighter">
              <span>Encrypted Link</span>
              <span className="text-cyber-blue">Active</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-tighter">
              <span>Node Latency</span>
              <span>12ms</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-obsidian bg-muted flex items-center justify-center overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="user" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold opacity-40 uppercase">1.2k Active Nodes</span>
        </div>
      </div>
    </div>
  );
}
