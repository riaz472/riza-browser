"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { 
  ShieldCheck, Activity, Cpu, Timer, Globe, 
  Wallet, Zap, Lock, CreditCard, ChevronRight,
  TrendingUp, ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { blockedAds, blockedTrackers, wallet } = useBrowser();
  const [stats, setStats] = useState({
    speed: '84.2 Mbps',
    memory: '1.2 GB / 16 GB',
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
        memory: `${(1.1 + Math.random() * 0.2).toFixed(1)} GB / 16 GB`,
        speed: `${(80 + Math.random() * 10).toFixed(1)} Mbps`
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                System Online
              </div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Node Location: Tokyo-Edge-4
              </div>
            </div>
            <h2 className="text-6xl font-headline font-black tracking-tighter text-slate-900">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">RizaBrowser</span>
            </h2>
          </div>
          <div className="hidden lg:block">
            <div className="glass-panel px-6 py-4 rounded-3xl flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Rank</div>
                <div className="text-xl font-bold font-headline">#1,402</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Network Speed', value: stats.speed, icon: Globe, color: 'text-primary' },
            { label: 'Memory Leakage', value: stats.memory, icon: Cpu, color: 'text-accent' },
            { label: 'Security Core', value: `${stats.security}%`, icon: ShieldCheck, color: 'text-green-500' },
            { label: 'Session Timer', value: stats.timer, icon: Timer, color: 'text-slate-600' }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-[2rem] hover:scale-[1.02] transition-transform cursor-default group">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-white", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-10 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-2xl font-headline font-black text-slate-900">{item.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Wallet & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
                      <Wallet className="w-7 h-7 text-primary" />
                      RizaWallet Assets
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Lock className="w-3 h-3" />
                      Biometric Secured
                    </div>
                  </div>
                  <div className="flex items-end gap-4 mb-10">
                    <span className="text-5xl font-headline font-black text-slate-900">${wallet.balance}</span>
                    <span className="text-green-500 font-bold mb-1.5 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +4.2%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 transition-all shadow-sm hover:shadow-md">
                    <Zap className="w-6 h-6 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Stake</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 transition-all shadow-sm hover:shadow-md">
                    <CreditCard className="w-6 h-6 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Card</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 transition-all shadow-sm hover:shadow-md">
                    <Activity className="w-6 h-6 text-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Nodes</span>
                  </button>
                </div>
             </div>
          </div>

          <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col space-y-8">
            <h3 className="text-xl font-headline font-bold">Privacy Shield</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <div className="text-sm font-bold text-slate-500">Ads Deflected</div>
                 <div className="text-lg font-black font-headline text-primary">{blockedAds}</div>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-primary" style={{ width: '75%' }} />
               </div>
               
               <div className="flex items-center justify-between">
                 <div className="text-sm font-bold text-slate-500">Trackers Blocked</div>
                 <div className="text-lg font-black font-headline text-accent">{blockedTrackers}</div>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-accent" style={{ width: '60%' }} />
               </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                Generate VPN Node
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}