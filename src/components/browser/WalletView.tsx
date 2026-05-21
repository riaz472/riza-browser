
"use client";

import React, { useState } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';

const WalletIcon = ({ d, color = "currentColor", size = 24 }: { d: string, color?: string, size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function WalletView() {
  const { wallet } = useBrowser();

  if (wallet.isLocked) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white p-12">
        <div className="glass-panel p-16 rounded-[4rem] text-center space-y-10 max-w-md w-full border-slate-200 shadow-2xl">
          <div className="w-28 h-28 rounded-[3rem] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto shadow-sm">
            <WalletIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={40} color="#338BFF" />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-headline font-black text-slate-900">Vault Encrypted</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Biometric signature required.</p>
          </div>
          <button 
            onClick={() => wallet.setLocked(false)}
            className="w-full py-6 rounded-[2rem] bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-slate-300"
          >
            Authenticate Node
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-slate-50/50 h-full">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="space-y-2">
             <h2 className="text-4xl font-headline font-black flex items-center gap-5 text-slate-900">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl">
                 <WalletIcon d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4M4 6v12c0 1.1.9 2 2 2h14v-4M16 12h4" size={24} />
               </div>
               RizaWallet <span className="text-slate-300 font-light tracking-tighter">Node-RX4</span>
             </h2>
             <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Premium Decentralized Node Banking</p>
           </div>
           <button onClick={() => wallet.setLocked(true)} className="px-8 py-3 rounded-2xl border border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all text-slate-600">
             Lock Vault
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-panel p-16 rounded-[4rem] relative overflow-hidden bg-white border-white/60 shadow-2xl">
               <div className="absolute top-0 right-0 p-16 opacity-5">
                 <WalletIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={200} />
               </div>
               <div className="relative z-10 space-y-16">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Total Balance</div>
                      <div className="text-7xl font-headline font-black text-slate-900 tracking-tighter">${wallet.balance}</div>
                      <div className="flex items-center gap-3 mt-6">
                         <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                           + 12.5% THIS WEEK
                         </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Vault Address</div>
                       <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl">
                         <span className="font-code font-bold text-sm text-slate-700">{wallet.address}</span>
                         <WalletIcon d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2 M12 11h4 M12 16h4 M8 11h.01 M8 16h.01" size={16} />
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 pt-10">
                    {['Send', 'Swap', 'Buy', 'Bridge'].map((label, i) => (
                      <button key={i} className="flex flex-col items-center gap-4 p-8 rounded-[3rem] bg-slate-50 hover:bg-primary hover:text-white transition-all group border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all group-hover:scale-110">
                           <WalletIcon d="M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" size={20} color="inherit" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 group-hover:text-white">{label}</span>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="glass-panel p-12 rounded-[3.5rem] space-y-10 border-white/60">
              <h3 className="text-xl font-headline font-black text-slate-900">Asset Status</h3>
              <div className="space-y-8">
                {[
                  { label: 'RIZA Tokens', value: 65, color: 'bg-primary' },
                  { label: 'Ether Node', value: 20, color: 'bg-accent' },
                  { label: 'Stable Credits', value: 15, color: 'bg-slate-900' }
                ].map((asset, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">{asset.label}</span>
                      <span className="text-slate-900">{asset.value}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000", asset.color)} style={{ width: `${asset.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-12 rounded-[3.5rem] bg-slate-900 text-white space-y-8">
               <h3 className="text-xl font-headline font-black neon-cyan-glow">Node Security</h3>
               <div className="p-6 rounded-[2rem] bg-white/10 border border-white/10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                      <WalletIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest">Encryption Active</div>
                      <div className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">TLS 1.3 Certified</div>
                    </div>
                  </div>
               </div>
               <p className="text-[10px] font-medium text-white/40 leading-relaxed uppercase tracking-widest">
                 Your assets are binding to Node-ID RX-9902-B. 
               </p>
               <button className="w-full py-5 rounded-2xl bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all">
                 Backup Vault
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
