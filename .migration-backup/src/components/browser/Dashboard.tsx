
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';

const DashboardIcon = ({ d, color }: { d: string, color: string }) => (
  <svg viewBox="0 0 24 24" className={`w-6 h-6 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function Dashboard() {
  const { blockedAds, blockedTrackers, wallet } = useBrowser();
  const [stats, setStats] = useState({
    speed: '84.2 Mbps',
    memory: '1.2 GB',
    security: 98,
    timer: '00:00:00'
  });

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      
      setStats(prev => ({
        ...prev,
        timer: `${h}:${m}:${s}`,
        memory: `${(1.1 + Math.random() * 0.2).toFixed(1)} GB`,
        speed: `${(80 + Math.random() * 15).toFixed(1)} Mbps`
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const statConfig = [
    { label: 'Transmission', value: stats.speed, color: 'text-primary', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { label: 'Core Load', value: stats.memory, color: 'text-accent', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M9 9h6v6H9z' },
    { label: 'Shield Integrity', value: `${stats.security}%`, color: 'text-green-500', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
    { label: 'Active Session', value: stats.timer, color: 'text-slate-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              System Online
            </div>
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Node Location: Tokyo-Edge-4
            </div>
          </div>
          <h2 className="text-7xl font-headline font-black tracking-tighter text-slate-900">
            Welcome to <span className="text-primary neon-cyan-glow">RizaBrowser</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl text-lg">
            A premium high-density browsing node with integrated decentralized banking and native shell execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statConfig.map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-[3rem] hover:scale-[1.02] transition-all cursor-default group border-white/60">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(0,0,0,0.05)]`}>
                  <DashboardIcon d={item.icon} color={item.color} />
                </div>
                <div className="text-[10px] font-black text-slate-300 group-hover:text-primary transition-colors">LIVE</div>
              </div>
              <div className="text-3xl font-headline font-black text-slate-900">{item.value}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 glass-panel p-12 rounded-[4rem] relative overflow-hidden bg-white/80 border-white/80 shadow-2xl shadow-slate-200/50">
             <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-[100px]" />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-headline font-black flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4M4 6v12c0 1.1.9 2 2 2h14v-4M16 12h4" /></svg>
                    </div>
                    RizaWallet Node
                  </h3>
                  <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    Biometric Ready
                  </div>
                </div>
                
                <div className="flex items-end gap-6 mb-16">
                  <span className="text-7xl font-headline font-black text-slate-900 tracking-tighter">${wallet.balance}</span>
                  <span className="text-green-500 font-bold mb-3 flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full text-sm">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 6l-9.5 9.5-5-5L1 18M23 6h-6M23 6v6"/></svg>
                    +4.2%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {['Stake', 'Assets', 'Activity'].map((label, i) => (
                    <button key={i} className="group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-slate-50/50 hover:bg-white border border-slate-100 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all group-hover:scale-110">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-primary">{label}</span>
                    </button>
                  ))}
                </div>
             </div>
          </div>

          <div className="glass-panel p-12 rounded-[4rem] flex flex-col justify-between border-white/80 bg-slate-50/30">
            <div className="space-y-8">
              <h3 className="text-2xl font-headline font-black">Security Matrix</h3>
              <div className="space-y-10">
                 <div className="space-y-4">
                   <div className="flex items-center justify-between px-1">
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ads Blocked</div>
                     <div className="text-2xl font-black font-headline text-primary neon-cyan-glow">{blockedAds}</div>
                   </div>
                   <div className="w-full h-2.5 bg-slate-200/50 rounded-full overflow-hidden">
                     <div className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(51,139,255,0.5)]" style={{ width: '85%' }} />
                   </div>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="flex items-center justify-between px-1">
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Trackers Purged</div>
                     <div className="text-2xl font-black font-headline text-accent neon-magenta-glow">{blockedTrackers}</div>
                   </div>
                   <div className="w-full h-2.5 bg-slate-200/50 rounded-full overflow-hidden">
                     <div className="h-full bg-accent transition-all duration-1000 shadow-[0_0_10px_rgba(166,51,255,0.5)]" style={{ width: '65%' }} />
                   </div>
                 </div>
              </div>
            </div>
            <button className="w-full py-6 rounded-[2rem] bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-slate-400">
              Launch VPN Tunnel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
