
"use client";

import React from 'react';
import { Puzzle, ShieldCheck, Key, Code, Star, CheckCircle2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ExtensionStore() {
  const extensions = [
    {
      id: 'dark-reader',
      name: 'Dark Reader Ultra',
      description: 'Aggressive global CSS inversion for eye protection in low-light environments.',
      icon: Code,
      rating: 4.9,
      installs: '2.1M',
      color: 'text-cyber-purple',
      installed: true,
    },
    {
      id: 'password-manager',
      name: 'Riza Pass Vault',
      description: 'Military-grade local credential storage with biometric binding.',
      icon: Key,
      rating: 5.0,
      installs: '850K',
      color: 'text-cyber-blue',
      installed: true,
    },
    {
      id: 'ad-guard',
      name: 'Script Interceptor',
      description: 'Block all third-party tracking pixels and invasive analytic scripts automatically.',
      icon: ShieldCheck,
      rating: 4.8,
      installs: '4.2M',
      color: 'text-green-500',
      installed: false,
    }
  ];

  return (
    <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-headline font-bold flex items-center gap-4">
              <Puzzle className="w-10 h-10 text-cyber-purple" />
              Integrated Extension Store
            </h2>
            <p className="text-foreground/50 mt-2 text-lg">Enhance your browsing engine with premium verified modules.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input 
              type="text" 
              placeholder="Search marketplace..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyber-purple/20 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {extensions.map((ext) => {
            const Icon = ext.icon;
            return (
              <div key={ext.id} className="glass-panel rounded-3xl p-8 group hover:border-white/20 transition-all flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className={cn("w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110", ext.color)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  {ext.installed && (
                    <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{ext.name}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed mb-6">
                    {ext.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      <span>{ext.rating} Rating</span>
                    </div>
                    <span>{ext.installs} Users</span>
                  </div>
                  <Button 
                    variant={ext.installed ? "secondary" : "default"}
                    className={cn(
                      "w-full rounded-2xl font-bold h-12 transition-all",
                      !ext.installed && "bg-cyber-purple hover:bg-cyber-purple/80 text-white"
                    )}
                  >
                    {ext.installed ? 'Config Module' : 'Add to Engine'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
