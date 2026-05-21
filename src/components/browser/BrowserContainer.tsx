
"use client";

import React from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from './Dashboard';
import { WebRenderer } from './WebRenderer';
import { TermuxTerminal } from './TermuxTerminal';
import { SettingsPanel } from './SettingsPanel';
import { WalletView } from './WalletView';
import { ExtensionStore } from './ExtensionStore';
import { SourceCodeAnalyzer } from './SourceCodeAnalyzer';

export function BrowserContainer() {
  const { currentView, wallpaper } = useBrowser();

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Dashboard />;
      case 'browser': return <WebRenderer />;
      case 'terminal': return <TermuxTerminal />;
      case 'settings': return <SettingsPanel />;
      case 'wallet': return <WalletView />;
      case 'extensions': return <ExtensionStore />;
      case 'analyzer': return <SourceCodeAnalyzer />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden relative font-body select-none">
      {/* Dynamic Background Engine */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {wallpaper.type === 'video' ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            key={wallpaper.url}
            className="w-full h-full object-cover opacity-10"
          >
            <source src={wallpaper.url} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-5 grayscale"
            style={{ backgroundImage: `url(${wallpaper.url})` }}
          />
        )}
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative overflow-hidden z-10">
        <TopBar />
        <main className="flex-1 relative overflow-hidden platinum-gradient">
          <div className="absolute inset-0 transition-all duration-700 ease-in-out">
            {renderView()}
          </div>
        </main>
        
        <footer className="h-10 px-6 glass-panel border-t border-slate-200/50 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] opacity-80 bg-white/80 shrink-0">
          <div className="flex gap-8">
            <span className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(51,139,255,0.8)]" />
              RizaOS v4.5.1 Platinum
            </span>
            <span className="text-slate-400">NODE_ID: RX-ALPHA-9902</span>
          </div>
          <div className="flex gap-8">
            <span className="text-slate-400">UPTIME: 48:12:05</span>
            <span className="text-primary font-bold">AES-256-GCM SECURED</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
