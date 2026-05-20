"use client";

import React, { useState } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, 
  RefreshCcw, Copy, Send, LayoutGrid, Lock, 
  Fingerprint, CreditCard, PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function WalletView() {
  const { wallet } = useBrowser();
  const [activeTab, setActiveTab] = useState('assets');
  const [isLocked, setIsLocked] = useState(false);

  if (isLocked) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white p-12">
        <div className="glass-panel p-12 rounded-[3rem] text-center space-y-8 max-w-md w-full border-slate-200">
          <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold">Wallet Encrypted</h2>
            <p className="text-slate-400 text-sm font-medium">Authentication required to access node assets.</p>
          </div>
          <Button 
            onClick={() => setIsLocked(false)}
            className="w-full h-16 rounded-3xl bg-slate-900 text-white font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200"
          >
            <Fingerprint className="w-6 h-6 mr-2" />
            Scan Biometric
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
           <div className="space-y-1">
             <h2 className="text-4xl font-headline font-bold flex items-center gap-4">
               <Wallet className="w-10 h-10 text-primary" />
               RizaWallet <span className="text-slate-300 font-light">Node-4</span>
             </h2>
             <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Premium Decentralized Node Banking</p>
           </div>
           <div className="flex gap-3">
             <Button onClick={() => setIsLocked(true)} variant="outline" className="rounded-2xl border-slate-200 font-bold">
               <Lock className="w-4 h-4 mr-2" />
               Lock Vault
             </Button>
             <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold px-8">
               <RefreshCcw className="w-4 h-4 mr-2" />
               Sync Node
             </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-12 rounded-[3rem] relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                 <ShieldCheck className="w-48 h-48" />
               </div>
               <div className="relative z-10 space-y-12">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Current Node Balance</div>
                      <div className="text-6xl font-headline font-black text-slate-900">${wallet.balance}</div>
                      <div className="flex items-center gap-2 mt-4">
                         <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                           + 12.5% THIS WEEK
                         </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Vault Address</div>
                       <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">
                         <span className="font-code font-bold text-sm text-slate-700">{wallet.address}</span>
                         <Copy className="w-4 h-4 text-slate-300 hover:text-primary cursor-pointer transition-colors" />
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-8">
                    {[
                      { icon: Send, label: 'Send' },
                      { icon: RefreshCcw, label: 'Swap' },
                      { icon: CreditCard, label: 'Buy' },
                      { icon: LayoutGrid, label: 'Bridge' }
                    ].map((btn, i) => (
                      <button key={i} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-slate-50 hover:bg-primary hover:text-white transition-all group border border-slate-100 shadow-sm">
                        <btn.icon className="w-6 h-6 text-primary group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{btn.label}</span>
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <div className="glass-panel p-10 rounded-[2.5rem] space-y-8">
              <h3 className="text-xl font-headline font-bold flex items-center justify-between">
                Recent Transactions
                <span className="text-xs font-bold text-primary cursor-pointer hover:underline">View All</span>
              </h3>
              <div className="space-y-4">
                {wallet.transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                        tx.type === 'Received' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      )}>
                        {tx.type === 'Received' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{tx.type} {tx.type === 'Received' ? 'from' : 'to'} {tx.from || tx.to}</div>
                        <div className="text-xs font-bold text-slate-400">{tx.date}</div>
                      </div>
                    </div>
                    <div className={cn("font-headline font-black text-xl", tx.type === 'Received' ? "text-green-600" : "text-slate-900")}>
                      {tx.type === 'Received' ? '+' : '-'}${tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="glass-panel p-10 rounded-[2.5rem] space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-lg font-headline font-bold">Asset Allocation</h3>
                 <PieChart className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-6">
                {[
                  { label: 'RIZA Tokens', value: 65, color: 'bg-primary' },
                  { label: 'Ether Node', value: 20, color: 'bg-accent' },
                  { label: 'Stable Credits', value: 15, color: 'bg-slate-900' }
                ].map((asset, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">{asset.label}</span>
                      <span className="text-slate-900">{asset.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000", asset.color)} style={{ width: `${asset.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[2.5rem] bg-slate-900 text-white space-y-6">
               <h3 className="text-lg font-headline font-bold">Node Security</h3>
               <div className="p-6 rounded-3xl bg-white/10 border border-white/10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Encryption Active</div>
                      <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">TLS 1.3 Certified</div>
                    </div>
                  </div>
               </div>
               <p className="text-xs font-medium text-white/40 leading-relaxed">
                 Your assets are binding to Node-ID RX-9902-B. Ensure your recovery phrase is secured offline.
               </p>
               <Button className="w-full h-12 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100">
                 Backup Vault
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}