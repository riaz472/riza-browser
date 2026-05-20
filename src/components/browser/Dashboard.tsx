
"use client";

import React from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Shield, Lock, EyeOff, Zap, ExternalLink, Activity, Globe } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { blockedAds, blockedTrackers, isStealthMode } = useBrowser();

  const quickAccess = [
    { name: 'Google', icon: 'https://picsum.photos/seed/google/100/100', url: 'https://google.com' },
    { name: 'YouTube', icon: 'https://picsum.photos/seed/youtube/100/100', url: 'https://youtube.com' },
    { name: 'TikTok', icon: 'https://picsum.photos/seed/tiktok/100/100', url: 'https://tiktok.com' },
    { name: 'Discord', icon: 'https://picsum.photos/seed/discord/100/100', url: 'https://discord.com' },
    { name: 'GitHub', icon: 'https://picsum.photos/seed/github/100/100', url: 'https://github.com' },
    { name: 'X', icon: 'https://picsum.photos/seed/twitter/100/100', url: 'https://x.com' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className={cn(
            "text-6xl font-headline font-black tracking-tighter transition-all duration-700",
            isStealthMode ? "text-cyber-crimson drop-shadow-[0_0_15px_rgba(255,51,51,0.5)]" : "text-cyber-blue drop-shadow-[0_0_15px_rgba(51,139,255,0.5)]"
          )}>
            rizabrowser
          </h2>
          <p className="text-xl text-foreground/60 font-medium">
            The Ultimate Premium Proxy Node & Developer Toolkit
          </p>
        </div>

        {/* Shield Monitor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-cyber-blue/10 flex items-center justify-center mb-6 border border-cyber-blue/20 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-cyber-blue" />
            </div>
            <div className="text-4xl font-headline font-bold mb-2 tabular-nums">{blockedAds}</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-40">Ads Blocked</div>
          </div>

          <div className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center group hover:border-accent/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-cyber-purple/10 flex items-center justify-center mb-6 border border-cyber-purple/20 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-cyber-purple" />
            </div>
            <div className="text-4xl font-headline font-bold mb-2 tabular-nums">{blockedTrackers}</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-40">Trackers Deflected</div>
          </div>

          <div className="glass-panel rounded-3xl p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8 text-cyber-blue" />
            </div>
            <div className="text-4xl font-headline font-bold mb-2">99.9%</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-40">Anonymity Score</div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] opacity-50">Quick Access Hub</h3>
            <div className="h-px flex-1 mx-8 bg-white/5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickAccess.map((site) => (
              <a
                key={site.name}
                href={site.url}
                className="glass-panel aspect-square rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 hover:bg-white/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-cyber-blue" />
                </div>
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-primary/20 transition-all">
                  <img src={site.icon} alt={site.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">{site.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Tech Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          <div className="flex gap-6 items-start p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Globe className="w-6 h-6 text-cyber-blue" />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Quantum Proxy Nodes</h4>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Experience ultra-low latency with our distributed global network of proxy nodes, designed for stealth and speed.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-6 rounded-3xl hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Lock className="w-6 h-6 text-cyber-purple" />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Biometric Encryption</h4>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Your credentials are encrypted using military-grade AES-256 protocols and secured via local machine binding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
