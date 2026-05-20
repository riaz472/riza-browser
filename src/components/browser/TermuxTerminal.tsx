"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Command, Trash2, Cpu, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TermuxTerminal() {
  const [history, setHistory] = useState<{ id: string, text: string, type: 'cmd' | 'resp' | 'sys' }[]>([
    { id: '1', text: 'RizaBrowser Terminal v4.5.1 [Linux Simulation]', type: 'sys' },
    { id: '2', text: 'Copyright (C) 2024 Riza Systems. All rights reserved.', type: 'sys' },
    { id: '3', text: 'Welcome, root. Type "help" for a list of commands.', type: 'sys' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { id: Date.now().toString(), text: `root@riza:~$ ${input}`, type: 'cmd' as const }];
    
    let resp = '';
    switch (cmd) {
      case 'help':
        resp = 'Available commands: help, clear, nodes, whoami, status, scan, wallet';
        break;
      case 'clear':
        setHistory([{ id: Date.now().toString(), text: 'Console cleared.', type: 'sys' }]);
        setInput('');
        return;
      case 'whoami':
        resp = 'root - authenticated via RizaCore Node';
        break;
      case 'status':
        resp = 'SYSTEM: NOMINAL | UPTIME: 48h 12m | LOAD: 0.14 | LATENCY: 24ms';
        break;
      case 'nodes':
        resp = 'ACTIVE NODES: [JP-TOK-1, US-NYC-4, DE-BER-9, UK-LON-2]';
        break;
      case 'scan':
        resp = 'Scanning network assets... [DONE] No vulnerabilities found in local node.';
        break;
      case 'wallet':
        resp = 'RIZAWALLET STATUS: CONNECTED | BALANCE: 420.69 RZ';
        break;
      default:
        resp = `Command not found: ${cmd}`;
    }

    setHistory([...newHistory, { id: (Date.now() + 1).toString(), text: resp, type: 'resp' as const }]);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col p-12 bg-slate-900 overflow-hidden font-code">
      <div className="max-w-5xl mx-auto w-full flex flex-col h-full bg-black/50 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-slate-900/80 px-8 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="h-4 w-px bg-slate-800 mx-2" />
            <div className="flex items-center gap-2 text-slate-400">
              <TerminalIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">riza-bash-v4.5</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary">
              <Activity className="w-3 h-3" />
              LIVE STREAM
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-accent">
              <Cpu className="w-3 h-3" />
              CPU: 12%
            </div>
          </div>
        </div>

        {/* Console Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-4 custom-scrollbar text-sm leading-relaxed"
        >
          {history.map((line) => (
            <div key={line.id} className={cn(
              "animate-in fade-in slide-in-from-left-2 duration-300",
              line.type === 'cmd' ? "text-white" : 
              line.type === 'sys' ? "text-primary opacity-80" : 
              "text-slate-400 pl-4 border-l border-slate-800"
            )}>
              {line.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleCommand} className="bg-black/80 px-10 py-6 border-t border-slate-800 flex items-center gap-4">
          <div className="text-primary font-bold">root@riza:~$</div>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white font-code text-sm"
            autoFocus
            spellCheck={false}
          />
          <button type="submit" className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
            <Command className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}