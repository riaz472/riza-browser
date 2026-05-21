
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useBrowser, BrowserView } from '@/context/BrowserContext';
import { cn } from '@/lib/utils';

// --- INLINE SVG COMPONENTS ---
const SVG = ({ d, size = 20, className = "" }: { d: string, size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const Icons = {
  Dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  Terminal: "M4 17l6-6-6-6 M12 19h8",
  Wallet: "M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4M4 6v12c0 1.1.9 2 2 2h14v-4M16 12h4",
  Settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
  Menu: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  Search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  Refresh: "M23 4v6h-6 M20.49 15a9 9 0 11-2.12-9.36L23 10",
  ArrowLeft: "M19 12H5 M12 19l-7-7 7-7",
  Shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  Plus: "M12 5v14 M5 12h14",
  Ghost: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z",
  Zoom: "M15 3h6v6 M9 21H3v-6 M21 3l-7 7 M3 21l7-7"
};

// --- SUB-COMPONENTS (CONSOLIDATED FOR STABILITY) ---

const TerminalPanel = () => {
  const [logs, setLogs] = useState<{ text: string, type: 'in' | 'out' | 'sys' }[]>([
    { text: 'RizaTerminal v4.5.1 [Stable]', type: 'sys' },
    { text: 'Connected to Tokyo-Edge-4 via encrypted tunnel.', type: 'sys' },
    { text: 'Type "help" for a list of commands.', type: 'sys' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCmd = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { text: `root@riza:~$ ${input}`, type: 'in' as const }];
    let resp = '';

    if (cmd === 'help') resp = 'Commands: help, ls, clear, neofetch, status, wallet';
    else if (cmd === 'ls') resp = 'bin/  etc/  home/  node_modules/  riza_wallet/  vault_key.aes';
    else if (cmd === 'clear') { setLogs([]); setInput(''); return; }
    else if (cmd === 'status') resp = 'CPU: 14% | RAM: 1.2GB | NODE: JP-TOK-1 | STATUS: SECURE';
    else if (cmd === 'neofetch') resp = 'RizaOS 4.5.1 Platinum\nKernel: 5.15.0-platinum-gen\nShell: bash 5.1.16\nUptime: 48h 12m\nTerminal: RizaTerm v4';
    else if (cmd === 'wallet') resp = 'RIZAWALLET: 420.69 RZ | ADDR: 0xRIZA...9902 | LOCKED: YES';
    else resp = `Command not found: ${cmd}`;

    setLogs([...newLogs, { text: resp, type: 'out' as const }]);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col p-10 bg-slate-900/95 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl h-full font-code overflow-hidden animate-in zoom-in-95">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3 text-cyan-400">
          <SVG d={Icons.Terminal} size={16} />
          <span className="text-[10px] font-black tracking-widest uppercase">riza-bash-v4</span>
        </div>
        <div className="text-[10px] font-black text-red-400 animate-pulse">ENCRYPTED</div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 px-4 custom-scrollbar text-xs leading-relaxed">
        {logs.map((l, i) => (
          <div key={i} className={cn(
            "whitespace-pre-wrap",
            l.type === 'in' ? "text-white font-bold" : l.type === 'sys' ? "text-cyan-400 opacity-80" : "text-slate-400 pl-4 border-l border-white/5"
          )}>
            {l.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleCmd} className="mt-4 flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl">
        <span className="text-cyan-400 font-bold text-xs">root@riza:~$</span>
        <input 
          autoFocus 
          value={input} 
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white text-xs font-code"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

const WalletPanel = () => {
  const { wallet } = useBrowser();
  if (wallet.isLocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-12">
        <div className="glass-panel p-16 rounded-[4rem] text-center space-y-10 max-w-md w-full border-slate-200 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
           <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto text-primary">
             <SVG d={Icons.Shield} size={48} />
           </div>
           <div className="space-y-3">
             <h2 className="text-4xl font-headline font-black">Vault Locked</h2>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Biometric Signature Required</p>
           </div>
           <button onClick={() => wallet.setLocked(false)} className="w-full py-6 rounded-[2rem] bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Authenticate Node</button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 p-12 overflow-y-auto bg-slate-50/50">
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-black text-slate-900 flex items-center gap-4">
              <SVG d={Icons.Wallet} size={32} className="text-primary" />
              RizaWallet <span className="text-slate-300 font-light">RX-99</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stable Node Balance</p>
          </div>
          <button onClick={() => wallet.setLocked(true)} className="px-6 py-2 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white transition-all">Lock Vault</button>
        </div>
        <div className="glass-panel p-16 rounded-[4rem] bg-white border-white/60 shadow-2xl space-y-12">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Value</div>
              <div className="text-7xl font-headline font-black text-slate-900 tracking-tighter">${wallet.balance}</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl text-right">
              <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Vault Address</div>
              <div className="font-code font-bold text-xs text-slate-600">{wallet.address}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {['Send', 'Swap', 'Buy', 'Stake'].map((l, i) => (
              <button key={i} className="flex flex-col items-center gap-4 p-8 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-primary hover:text-white transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <SVG d="M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z" size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { blockedAds, blockedTrackers } = useBrowser();
  const [stats, setStats] = useState({ cpu: '12%', ram: '1.2GB', net: '84Mbps' });

  useEffect(() => {
    const i = setInterval(() => {
      setStats({
        cpu: `${(10 + Math.random() * 5).toFixed(1)}%`,
        ram: `${(1.1 + Math.random() * 0.2).toFixed(1)}GB`,
        net: `${(80 + Math.random() * 10).toFixed(1)}Mbps`
      });
    }, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex-1 p-16 overflow-y-auto custom-scrollbar bg-slate-50/30">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="space-y-6">
          <div className="flex gap-4">
             <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">System Online</div>
             <div className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest">Node: JP-TOK-1</div>
          </div>
          <h1 className="text-8xl font-headline font-black tracking-tighter text-slate-900 leading-none">
            Riza<span className="text-primary">Browser</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            The ultimate premium high-density browsing node. Secure, decentralized, and flawlessly aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { l: 'Network Speed', v: stats.net, c: 'text-primary' },
            { l: 'Core Load', v: stats.cpu, c: 'text-cyan-500' },
            { l: 'Memory', v: stats.ram, c: 'text-purple-500' },
            { l: 'Encryption', v: 'AES-256', c: 'text-green-500' }
          ].map((s, i) => (
            <div key={i} className="glass-panel p-10 rounded-[3rem] border-white/60 bg-white shadow-xl hover:-translate-y-2 transition-all">
              <div className="text-3xl font-headline font-black text-slate-900 mb-2">{s.v}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 glass-panel p-12 rounded-[4rem] bg-white border-white/80 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[80px]" />
            <div className="relative z-10 space-y-12">
               <h3 className="text-2xl font-headline font-black flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white"><SVG d={Icons.Shield} size={20} /></div>
                 Security Core
               </h3>
               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span>Ads Blocked</span><span className="text-primary">{blockedAds}</span></div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary w-[85%] animate-pulse" /></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span>Trackers Purged</span><span className="text-cyan-400">{blockedTrackers}</span></div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 w-[65%] animate-pulse" /></div>
                  </div>
               </div>
               <button className="w-full py-5 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Configure Security Matrix</button>
            </div>
          </div>
          <div className="glass-panel p-12 rounded-[4rem] bg-slate-900 text-white flex flex-col justify-between border-white/10">
            <h3 className="text-2xl font-headline font-black text-primary">Node Status</h3>
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Stable Link Established</span>
              </div>
              <p className="text-[10px] font-medium leading-relaxed uppercase tracking-widest opacity-40">Your node is currently operating on Tokyo-Edge-4. AES-256 tunnel is active and monitored.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CONTAINER ---

export function BrowserContainer() {
  const { 
    currentView, setView, activeUrl, navigate, 
    zoom, setZoom, wallpaper, setWallpaper,
    isStealthMode, toggleStealthMode,
    isDesktopMode, setDesktopMode
  } = useBrowser();

  const [inputUrl, setInputUrl] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [wpUrl, setWpUrl] = useState(wallpaper.url);

  useEffect(() => {
    setInputUrl(activeUrl || (currentView === 'home' ? 'rizabrowser://home' : ''));
  }, [activeUrl, currentView]);

  const renderView = () => {
    switch(currentView) {
      case 'home': return <Dashboard />;
      case 'terminal': return <TerminalPanel />;
      case 'wallet': return <WalletPanel />;
      case 'browser': return (
        <div className="flex-1 h-full bg-white relative overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-500 origin-top" style={{ transform: `scale(${zoom / 100})`, width: `${(100/zoom)*100}%`, height: `${(100/zoom)*100}%` }}>
            <iframe 
              src={activeUrl.includes('.') ? (activeUrl.startsWith('http') ? activeUrl : `https://${activeUrl}`) : `https://www.google.com/search?q=${activeUrl}&igu=1`} 
              className={cn("w-full h-full border-none", !isDesktopMode && "max-w-screen-md mx-auto shadow-2xl my-10 rounded-[3rem]")}
              title="riza-viewport"
            />
          </div>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden relative font-body select-none">
      
      {/* WALLPAPER ENGINE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {wallpaper.type === 'video' ? (
          <video autoPlay muted loop playsInline key={wallpaper.url} className="w-full h-full object-cover opacity-10">
            <source src={wallpaper.url} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-cover bg-center opacity-5 grayscale" style={{ backgroundImage: `url(${wallpaper.url})` }} />
        )}
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      {/* SIDEBAR */}
      <div className="w-24 glass-panel border-r border-slate-200/50 flex flex-col items-center py-10 z-50 bg-white/80">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 mb-12", isStealthMode ? "bg-red-500 text-white shadow-xl shadow-red-500/30" : "bg-primary text-white shadow-xl shadow-primary/30")}>
          <span className="font-headline font-black text-xl">R</span>
        </div>
        <div className="flex-1 flex flex-col gap-8">
          {[
            { id: 'home', icon: Icons.Dashboard },
            { id: 'terminal', icon: Icons.Terminal },
            { id: 'wallet', icon: Icons.Wallet },
          ].map(item => (
            <button key={item.id} onClick={() => setView(item.id as BrowserView)} className={cn("p-4 rounded-2xl transition-all", currentView === item.id ? "bg-slate-100 text-primary" : "text-slate-400 hover:text-slate-900")}>
              <SVG d={item.icon} />
            </button>
          ))}
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-4 rounded-2xl text-slate-400 hover:text-slate-900">
          <SVG d={Icons.Settings} />
        </button>
      </div>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden platinum-gradient">
        
        {/* TOP BAR */}
        <div className="h-20 flex items-center px-8 gap-8 glass-panel border-b border-slate-200/50 bg-white/95 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setView('home')} className="p-3 hover:bg-slate-100 rounded-xl transition-all text-slate-400"><SVG d={Icons.ArrowLeft} /></button>
            <button onClick={() => navigate(activeUrl)} className="p-3 hover:bg-slate-100 rounded-xl transition-all text-slate-400"><SVG d={Icons.Refresh} /></button>
          </div>
          <div className="flex-1 max-w-4xl mx-auto">
            <div className="flex items-center bg-slate-100/60 border border-slate-200 rounded-[1.5rem] px-6 h-12 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <SVG d={Icons.Shield} size={14} className="mr-4 text-slate-300" />
              <input 
                value={inputUrl} 
                onChange={e => setInputUrl(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && navigate(inputUrl)}
                className="flex-1 bg-transparent outline-none text-sm font-bold text-slate-700" 
                placeholder="Navigate grid..." 
              />
              <SVG d={Icons.Search} size={16} className="ml-4 text-slate-300" />
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
             <button onClick={toggleStealthMode} className={cn("px-6 py-2.5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest", isStealthMode ? "bg-red-500 text-white border-red-600 shadow-lg" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400")}>
               {isStealthMode ? 'Ghost Mode' : 'Go Stealth'}
             </button>
             <button onClick={() => setShowMenu(!showMenu)} className="p-3 hover:bg-slate-100 rounded-xl text-slate-600 relative">
               <SVG d={Icons.Menu} />
             </button>

             {/* 3-DOTS MATRIX MENU */}
             {showMenu && (
               <div className="absolute top-16 right-0 w-80 glass-panel bg-white border-slate-200 rounded-[2.5rem] shadow-2xl p-6 z-[100] animate-in slide-in-from-top-4">
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { l: 'New', d: Icons.Plus, c: 'text-primary', a: () => navigate('google.com') },
                      { l: 'Ghost', d: Icons.Ghost, c: 'text-red-500', a: toggleStealthMode },
                      { l: 'Bash', d: Icons.Terminal, c: 'text-cyan-500', a: () => setView('terminal') },
                      { l: 'Vault', d: Icons.Wallet, c: 'text-green-500', a: () => setView('wallet') }
                    ].map((b, i) => (
                      <button key={i} onClick={() => { b.a(); setShowMenu(false); }} className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 transition-all group shadow-sm">
                        <SVG d={b.d} size={18} className={b.c} />
                        <span className="text-[8px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">{b.l}</span>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="px-4 py-2 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span>Zoom Scale</span>
                        <span className="text-primary">{zoom}%</span>
                      </div>
                      <input type="range" min="50" max="200" step="10" value={zoom} onChange={e => setZoom(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary" />
                    </div>
                    <button onClick={() => setDesktopMode(!isDesktopMode)} className="w-full flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all">
                      <span className="text-sm font-bold">{isDesktopMode ? 'Mobile Agent' : 'Desktop Agent'}</span>
                      <SVG d={Icons.Shield} size={14} className={isDesktopMode ? "text-primary" : "text-slate-300"} />
                    </button>
                    <button onClick={() => { window.location.reload(); }} className="w-full flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-red-50 text-red-500 transition-all">
                      <span className="text-sm font-bold">Purge Node Cache</span>
                    </button>
                  </div>
               </div>
             )}
          </div>
        </div>

        {/* VIEWPORT AREA */}
        <main className="flex-1 relative overflow-hidden platinum-gradient">
           {renderView()}

           {/* SETTINGS MODAL */}
           {showSettings && (
             <div className="absolute inset-0 z-[100] flex items-center justify-center p-12 bg-white/60 backdrop-blur-3xl animate-in fade-in">
               <div className="glass-panel w-full max-w-4xl p-16 rounded-[4rem] bg-white border-white/60 shadow-2xl space-y-16">
                 <div className="flex justify-between items-center">
                    <h2 className="text-5xl font-headline font-black flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white"><SVG d={Icons.Settings} size={28} /></div>
                      Node Preferences
                    </h2>
                    <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-900 font-black">CLOSE</button>
                 </div>
                 <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-8">
                     <h3 className="text-xl font-headline font-black text-slate-900">Wallpaper Engine</h3>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resource URL (Direct Link)</label>
                        <input value={wpUrl} onChange={e => setWpUrl(e.target.value)} placeholder="Paste MP4 or Image URL..." className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-primary/10 transition-all" />
                        <div className="grid grid-cols-2 gap-4 pt-2">
                           <button onClick={() => setWallpaper({ type: 'image', url: wpUrl })} className="py-4 rounded-2xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest">Apply Image</button>
                           <button onClick={() => setWallpaper({ type: 'video', url: wpUrl })} className="py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">Apply Video</button>
                        </div>
                     </div>
                   </div>
                   <div className="space-y-8">
                     <h3 className="text-xl font-headline font-black text-slate-900">Privacy Core</h3>
                     <div className="space-y-4">
                        {['WebRTC Masking', 'Canvas Jitter', 'Secure Routing'].map((l, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-bold">{l}</span>
                            <div className="w-10 h-5 bg-primary rounded-full p-1 flex justify-end"><div className="w-3 h-3 bg-white rounded-full" /></div>
                          </div>
                        ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}
        </main>

        <footer className="h-10 px-6 glass-panel border-t border-slate-200/50 flex items-center justify-between text-[9px] font-black uppercase tracking-widest opacity-60 bg-white/80 shrink-0">
          <div className="flex gap-8 items-center">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>RizaOS v4.5.1 Platinum Stable</span>
            <span className="text-slate-300">NODE_ID: RX-ALPHA-9902</span>
          </div>
          <div className="flex gap-8">
            <span>UPTIME: 48:12:05</span>
            <span className="text-primary">AES-256-GCM SECURED</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
