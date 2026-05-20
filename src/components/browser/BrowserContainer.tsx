
"use client";

import React from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Dashboard } from './Dashboard';
import { WebRenderer } from './WebRenderer';
import { SourceCodeAnalyzer } from './SourceCodeAnalyzer';
import { ScriptTerminal } from './ScriptTerminal';
import { ExtensionStore } from './ExtensionStore';
import { SettingsPanel } from './SettingsPanel';
import { cn } from '@/lib/utils';

export function BrowserContainer() {
  const { currentView } = useBrowser();

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Dashboard />;
      case 'browser': return <WebRenderer />;
      case 'analyzer': return <SourceCodeAnalyzer />;
      case 'terminal': return <ScriptTerminal />;
      case 'extensions': return <ExtensionStore />;
      case 'settings': return <SettingsPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-obsidian text-foreground overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple/5 rounded-full blur-[120px] pointer-events-none" />
        
        <TopBar />
        <main className="flex-1 relative overflow-hidden bg-background/40">
          <div className="absolute inset-0 transition-all duration-500">
            {renderView()}
          </div>
        </main>
        
        {/* Footer Info */}
        <footer className="h-10 px-6 glass-panel border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-30 shrink-0">
          <div className="flex gap-6">
            <span>RIZABROWSER OS</span>
            <span>NODE ID: RX-9902-B</span>
          </div>
          <div className="flex gap-6">
            <span>SSL: TLS 1.3 ENABLED</span>
            <span className="text-cyber-blue">SYSTEM NOMINAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
