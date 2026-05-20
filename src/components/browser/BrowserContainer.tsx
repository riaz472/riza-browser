"use client";

import React from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from './Dashboard';
import { WebRenderer } from './WebRenderer';
import { SourceCodeAnalyzer } from './SourceCodeAnalyzer';
import { TermuxTerminal } from './TermuxTerminal';
import { ExtensionStore } from './ExtensionStore';
import { SettingsPanel } from './SettingsPanel';
import { WalletView } from './WalletView';
import { cn } from '@/lib/utils';

export function BrowserContainer() {
  const { currentView, wallpaper } = useBrowser();

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Dashboard />;
      case 'browser': return <WebRenderer />;
      case 'analyzer': return <SourceCodeAnalyzer />;
      case 'terminal': return <TermuxTerminal />;
      case 'extensions': return <ExtensionStore />;
      case 'settings': return <SettingsPanel />;
      case 'wallet': return <WalletView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden relative font-body">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {wallpaper.type === 'video' ? (
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-10"
          >
            <source src={wallpaper.url} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-5"
            style={{ backgroundImage: `url(${wallpaper.url})` }}
          />
        )}
        <div className="absolute inset-0 cyber-grid" />
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative overflow-hidden z-10">
        <TopBar />
        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 transition-all duration-500">
            {renderView()}
          </div>
        </main>
        
        <footer className="h-8 px-6 glass-panel border-t border-slate-200/50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-60 bg-white/80 shrink-0">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              RizaBrowser OS Engine 4.5.1
            </span>
            <span>NODE_ID: RX-ALPHA-9902</span>
          </div>
          <div className="flex gap-6">
            <span>UPTIME: 48:12:05</span>
            <span className="text-primary">ENCRYPTION: AES-256-GCM</span>
          </div>
        </footer>
      </div>
    </div>
  );
}