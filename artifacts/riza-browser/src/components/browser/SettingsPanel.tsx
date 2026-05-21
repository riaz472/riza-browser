
"use client";

import React, { useState } from 'react';
import { useBrowser } from '@/context/BrowserContext';

const SettingsIcon = ({ d, color = "currentColor", size = 20 }: { d: string, color?: string, size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function SettingsPanel() {
  const { wallpaper, setWallpaper } = useBrowser();
  const [urlInput, setUrlInput] = useState(wallpaper.url);

  const applyWallpaper = (type: 'image' | 'video') => {
    if (!urlInput) return;
    setWallpaper({ type, url: urlInput });
  };

  return (
    <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-headline font-black flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl">
              <SettingsIcon d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" size={28} />
            </div>
            Node Settings
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Configure your identity engine and aesthetics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-panel p-10 rounded-[3rem] space-y-8">
            <h3 className="text-xl font-headline font-black flex items-center gap-3">
              <SettingsIcon d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7" color="#338BFF" />
              Wallpaper Engine
            </h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resource URL</label>
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste image or MP4 link..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => applyWallpaper('image')} className="py-4 rounded-2xl bg-white border border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Set Image</button>
                <button onClick={() => applyWallpaper('video')} className="py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">Set Video</button>
              </div>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[3rem] space-y-8">
            <h3 className="text-xl font-headline font-black flex items-center gap-3">
              <SettingsIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" color="#A633FF" />
              Privacy Core
            </h3>
            <div className="space-y-6">
              {[
                { label: 'WebRTC Leak Protection', active: true },
                { label: 'Canvas Fingerprint Mixing', active: true },
                { label: 'WebGL Simulation', active: true }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-sm font-bold">{item.label}</span>
                  <div className="w-10 h-5 bg-primary rounded-full p-1 flex justify-end">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
