
"use client";

import React, { useState, useEffect } from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Shield, Lock, EyeOff, Zap, ExternalLink, Activity, Globe, Server, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { blockedAds, blockedTrackers, isStealthMode } = useBrowser();
  // Initialize with zeros to avoid hydration mismatch
  const [trafficData, setTrafficData] = useState<number[]>(Array(30).fill(0));
  const [recentLogs, setRecentLogs] = useState<{ id: string; msg: string; timestamp: string }[]>([]);

  // Simulation of real-time data flow
  useEffect(() => {
    // Populate initial random data only on client mount
    setTrafficData(Array(30).fill(0).map(() => Math.random() * 80 + 20));

    const interval = setInterval(() => {
      // Update graph
      setTrafficData(prev => [...prev.slice(1), Math.random() * 80 + 20]);
      
      // Add random system logs
      const logTypes = ['CONNECT', 'ENCRYPT', 'RELAY', 'BLOCK', 'ROUTE', 'HANDSHAKE'];
      const logNodes = ['JP-TOK-1', 'US-NYC-4', 'DE-BER-9', 'UK-LON-2', 'SG-SIN-3'];
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        msg: `${logTypes[Math.floor(Math.random() * logTypes.length)]}: Node ${logNodes[Math.floor(Math.random() * logNodes.length)]} processed packet cluster`,
        timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setRecentLogs(prev => [newLog, ...prev].slice(0, 6));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
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

        {/* Live Traffic & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-3xl p-8 space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Server className="w-4 h-4 text-cyber-blue" />
                Packet Traffic Matrix
              </h3>
              <div className="flex gap-4 text-[10px] font-bold opacity-40">
                <span>PEAK: 12.4 GBPS</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>
            <div className="flex-1 flex items-end gap-1.5 h-32 px-2">
              {trafficData.map((val, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-1 rounded-t-sm transition-all duration-700 ease-out",
                    isStealthMode ? "bg-cyber-crimson/30" : "bg-cyber-blue/30"
                  )}
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 space-y-6 bg-obsidian/40 border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyber-purple" />
              Node Activity Log
            </h3>
            <div className="space-y-4 overflow-hidden">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex gap-3 text-[10px] font-code animate-in fade-in slide-in-from-right-2">
                  <span className="opacity-30 shrink-0">[{log.timestamp}]</span>
                  <span className={cn(
                    "truncate",
                    isStealthMode ? "text-cyber-crimson/70" : "text-cyber-blue/70"
                  )}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {recentLogs.length === 0 && (
                <div className="text-center opacity-10 py-10 text-[10px] uppercase tracking-widest">
                  Initializing Streams...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-30">Quick Access Hub</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="flex gap-6 items-start p-8 rounded-3xl hover:bg-white/5 transition-colors glass-panel border-transparent">
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
          <div className="flex gap-6 items-start p-8 rounded-3xl hover:bg-white/5 transition-colors glass-panel border-transparent">
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
