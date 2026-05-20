
"use client";

import React from 'react';
import { useBrowser } from '@/context/BrowserContext';
import { Settings, Shield, User, Globe, Activity, Zap, Layers, Fingerprint } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export function SettingsPanel() {
  const { 
    engineProfile, setEngineProfile, 
    proxySpeed, setProxySpeed,
    fingerprintProtection, setFingerprintProtection 
  } = useBrowser();

  const toggleFingerprint = (key: keyof typeof fingerprintProtection) => {
    setFingerprintProtection({
      ...fingerprintProtection,
      [key]: !fingerprintProtection[key]
    });
  };

  return (
    <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h2 className="text-4xl font-headline font-bold flex items-center gap-4">
            <Settings className="w-10 h-10 text-cyber-blue" />
            Control Center
          </h2>
          <p className="text-foreground/50 mt-2 text-lg">Configure your identity engine and security matrix.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Identity Engine */}
          <div className="glass-panel rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-3 text-cyber-blue mb-4">
              <User className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Identity Engine</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider opacity-60">Engine Profile Switcher</Label>
                <Select value={engineProfile} onValueChange={setEngineProfile}>
                  <SelectTrigger className="w-full h-14 bg-white/5 border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-cyber-blue/20">
                    <SelectValue placeholder="Select Profile" />
                  </SelectTrigger>
                  <SelectContent className="bg-obsidian border-white/10 rounded-xl">
                    <SelectItem value="Chrome 122 (macOS)">Chrome 122 (macOS)</SelectItem>
                    <SelectItem value="Firefox 123 (Windows)">Firefox 123 (Windows)</SelectItem>
                    <SelectItem value="Safari 17.4 (iOS)">Safari 17.4 (iOS)</SelectItem>
                    <SelectItem value="Edge 121 (Linux)">Edge 121 (Linux)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider opacity-60">Proxy Routing Speed</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['standard', 'hyper', 'stealth'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setProxySpeed(s)}
                      className={cn(
                        "py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                        proxySpeed === s 
                          ? "bg-cyber-blue/20 border-cyber-blue text-cyber-blue" 
                          : "bg-white/5 border-white/10 opacity-50 hover:opacity-100"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fingerprint Matrix */}
          <div className="glass-panel rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-3 text-cyber-purple mb-4">
              <Fingerprint className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Fingerprint Matrix</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="space-y-1">
                  <div className="text-sm font-bold">WebRTC Leak Protection</div>
                  <div className="text-[10px] opacity-40 uppercase tracking-tighter">Blocks internal IP exposure</div>
                </div>
                <Switch 
                  checked={fingerprintProtection.webRTC} 
                  onCheckedChange={() => toggleFingerprint('webRTC')}
                  className="data-[state=checked]:bg-cyber-blue"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="space-y-1">
                  <div className="text-sm font-bold">Canvas Mixer</div>
                  <div className="text-[10px] opacity-40 uppercase tracking-tighter">Randomize drawing seed</div>
                </div>
                <Switch 
                  checked={fingerprintProtection.canvasMixing} 
                  onCheckedChange={() => toggleFingerprint('canvasMixing')}
                  className="data-[state=checked]:bg-cyber-blue"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider opacity-60">Geolocation Spoofing</Label>
                <Select value={fingerprintProtection.geoSpoofing} onValueChange={(v) => setFingerprintProtection({...fingerprintProtection, geoSpoofing: v})}>
                  <SelectTrigger className="w-full h-14 bg-white/5 border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-cyber-blue/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-obsidian border-white/10 rounded-xl">
                    <SelectItem value="London, UK">London, UK (51.5074° N)</SelectItem>
                    <SelectItem value="New York, USA">New York, USA (40.7128° N)</SelectItem>
                    <SelectItem value="Berlin, Germany">Berlin, Germany (52.5200° N)</SelectItem>
                    <SelectItem value="Tokyo, Japan">Tokyo, Japan (35.6764° N)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* System Summary */}
        <div className="glass-panel rounded-3xl p-8 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 border border-white/10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-cyber-blue/20 flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-cyber-blue flex items-center justify-center shadow-[0_0_30px_rgba(51,139,255,0.4)]">
                <Activity className="text-white w-8 h-8" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase opacity-40">Privacy Score</div>
                <div className="text-xl font-bold">Excellent</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase opacity-40">Encryption</div>
                <div className="text-xl font-bold">AES-256-GCM</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase opacity-40">Engine Integrity</div>
                <div className="text-xl font-bold text-green-500">Verified</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase opacity-40">Last Scan</div>
                <div className="text-xl font-bold">Just Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
