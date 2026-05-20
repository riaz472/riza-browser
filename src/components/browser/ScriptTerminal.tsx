
"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Play, Save, RotateCcw, Copy, Trash2, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScriptTerminal() {
  const [code, setCode] = useState(`// RizaBrowser Global Injector v1.0
// Write custom JS to interact with the current session

const app = {
  version: "4.0.1",
  init() {
    console.log("Riza Script Injected Successfully.");
    this.applyDarkTheme();
  },
  applyDarkTheme() {
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
  }
};

app.init();`);

  const [logs, setLogs] = useState<{ type: 'info' | 'error' | 'success', msg: string, time: string }[]>([]);

  useEffect(() => {
    // Set initial log only on client to avoid hydration mismatch
    setLogs([
      { type: 'info', msg: 'Riza Terminal Ready.', time: new Date().toLocaleTimeString() }
    ]);
  }, []);

  const runScript = () => {
    setLogs(prev => [{ 
      type: 'success', 
      msg: 'Script executed in virtual context.', 
      time: new Date().toLocaleTimeString() 
    }, ...prev]);
  };

  return (
    <div className="flex-1 flex flex-col p-8 lg:p-12 overflow-hidden bg-obsidian">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
              <Terminal className="w-8 h-8 text-cyber-blue" />
              Script Injection Terminal
            </h2>
            <p className="text-foreground/50 mt-1">Execute custom JavaScript logic within the current browser node.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setLogs([])}
              variant="outline" 
              className="rounded-xl border-white/10 hover:bg-white/5"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Console
            </Button>
            <Button 
              onClick={runScript}
              className="rounded-xl bg-cyber-blue hover:bg-cyber-blue/80 text-white font-bold px-8"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              Run Script
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
          <div className="lg:col-span-2 flex flex-col glass-panel rounded-3xl overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-2 opacity-40">
                <Command className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">injector.js</span>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-6 font-code text-sm outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-col glass-panel rounded-3xl overflow-hidden bg-obsidian/50 border border-white/5">
            <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest opacity-50">Console Output</span>
              <RotateCcw className="w-3 h-3 opacity-30 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-code text-xs">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-right-2">
                  <span className="opacity-30 shrink-0">[{log.time}]</span>
                  <span className={cn(
                    log.type === 'success' ? 'text-green-500' : 
                    log.type === 'error' ? 'text-cyber-crimson' : 
                    'text-cyber-blue'
                  )}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-center opacity-20 py-12">Console idle...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
