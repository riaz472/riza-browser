
"use client";

import React, { useState, useEffect, useRef } from 'react';

const TermIcon = ({ d, color = "currentColor", size = 16 }: { d: string, color?: string, size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function TermuxTerminal() {
  const [history, setHistory] = useState<{ id: string, text: string, type: 'cmd' | 'resp' | 'sys' }[]>([
    { id: '1', text: 'RizaTerminal v4.5.1 [Stable Build]', type: 'sys' },
    { id: '2', text: 'Connected to Tokyo-Edge-4 via encrypted tunnel.', type: 'sys' },
    { id: '3', text: 'Type "help" to list available commands.', type: 'sys' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { id: Date.now().toString(), text: `root@riza:~$ ${input}`, type: 'cmd' as const }];
    
    let resp = '';
    switch (cmd) {
      case 'help': resp = 'Commands: help, ls, clear, status, nodes, wallet, neofetch, pkg install <name>'; break;
      case 'clear': setHistory([]); setInput(''); return;
      case 'ls': resp = 'bin/  etc/  home/  node_modules/  riza_wallet/  config.json'; break;
      case 'status': resp = 'NODE: JP-TOK-1 | CPU: 12% | RAM: 1.4GB | LATENCY: 24ms'; break;
      case 'nodes': resp = 'ACTIVE: JP-TOK-1, US-NYC-4, DE-BER-9, UK-LON-2'; break;
      case 'wallet': resp = 'RIZAWALLET: 420.69 RZ | ADDRESS: 0xRIZA...9902 | SECURED: YES'; break;
      case 'neofetch': resp = `RizaOS 4.5.1 Platinum\n-------------------\nOS: RizaOS v4.5.1 x86_64\nKernel: 5.15.0-platinum-gen\nUptime: 48h 12m\nShell: bash 5.1.16\nTerminal: RizaTerm v4\nCPU: RizaNode Core x16\nGPU: CyberGraphics v2\nMemory: 1.4GB / 16GB`; break;
      default: 
        if (cmd.startsWith('pkg install ')) resp = `FETCHING package ${cmd.replace('pkg install ', '')}... [DONE]`;
        else resp = `Command not found: ${cmd}`;
    }

    setHistory([...newHistory, { id: (Date.now() + 1).toString(), text: resp, type: 'resp' as const }]);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col p-12 bg-slate-50 h-full font-code">
      <div className="max-w-5xl mx-auto w-full flex flex-col h-full bg-[#080A0D] border border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="bg-[#111827] px-8 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2 text-white/40">
              <TermIcon d="M4 17l6-6-6-6 M12 19h8" />
              <span className="text-[10px] font-black uppercase tracking-widest">riza-bash-v4</span>
            </div>
          </div>
          <div className="text-[10px] font-black text-primary flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            ENCRYPTED SESSION
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-4 custom-scrollbar text-sm leading-relaxed">
          {history.map((line) => (
            <div key={line.id} className={cn(
              "animate-in fade-in slide-in-from-left-2 duration-300 whitespace-pre-wrap",
              line.type === 'cmd' ? "text-white font-bold" : 
              line.type === 'sys' ? "text-primary opacity-80" : 
              "text-slate-500 pl-6 border-l border-white/5"
            )}>
              {line.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="bg-black/40 px-12 py-8 border-t border-white/5 flex items-center gap-4">
          <div className="text-primary font-bold">root@riza:~$</div>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white font-code text-sm"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
