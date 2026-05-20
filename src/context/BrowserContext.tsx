"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type BrowserView = 'home' | 'browser' | 'analyzer' | 'terminal' | 'settings' | 'extensions' | 'wallet';

interface BrowserContextType {
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  currentView: BrowserView;
  setView: (view: BrowserView) => void;
  activeUrl: string;
  navigate: (url: string) => void;
  history: string[];
  blockedAds: number;
  blockedTrackers: number;
  engineProfile: string;
  setEngineProfile: (p: string) => void;
  proxySpeed: 'standard' | 'hyper' | 'stealth';
  setProxySpeed: (s: 'standard' | 'hyper' | 'stealth') => void;
  zoom: number;
  setZoom: (z: number) => void;
  isDesktopMode: boolean;
  setDesktopMode: (v: boolean) => void;
  wallpaper: { type: 'image' | 'video', url: string };
  setWallpaper: (w: { type: 'image' | 'video', url: string }) => void;
  wallet: {
    balance: number;
    address: string;
    transactions: any[];
  };
}

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

export function BrowserProvider({ children }: { children: React.ReactNode }) {
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [currentView, setCurrentView] = useState<BrowserView>('home');
  const [activeUrl, setActiveUrl] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [blockedAds, setBlockedAds] = useState(1204);
  const [blockedTrackers, setBlockedTrackers] = useState(842);
  const [engineProfile, setEngineProfile] = useState('Chrome 122 (macOS)');
  const [proxySpeed, setProxySpeed] = useState<'standard' | 'hyper' | 'stealth'>('standard');
  const [zoom, setZoom] = useState(100);
  const [isDesktopMode, setDesktopMode] = useState(false);
  const [wallpaper, setWallpaper] = useState<{ type: 'image' | 'video', url: string }>({
    type: 'image',
    url: 'https://picsum.photos/seed/cyber/1920/1080'
  });

  const [wallet] = useState({
    balance: 420.69,
    address: '0xRIZA...9902',
    transactions: [
      { id: 1, type: 'Received', amount: 50, from: 'Node-Explorer', date: '2024-05-20' },
      { id: 2, type: 'Sent', amount: 10, to: 'Proxy-Node-Alpha', date: '2024-05-19' },
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockedAds(prev => prev + Math.floor(Math.random() * 2));
      setBlockedTrackers(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleStealthMode = () => {
    setIsStealthMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('stealth-mode');
      } else {
        document.documentElement.classList.remove('stealth-mode');
      }
      return next;
    });
  };

  const navigate = (url: string) => {
    let target = url.trim();
    if (!target) return;
    if (target === 'rizabrowser://home') {
      setView('home');
      return;
    }
    setActiveUrl(target);
    setHistory(prev => [target, ...prev].slice(0, 50));
    setCurrentView('browser');
  };

  const setView = (view: BrowserView) => {
    setCurrentView(view);
    if (view === 'home') setActiveUrl('');
  };

  return (
    <BrowserContext.Provider
      value={{
        isStealthMode,
        toggleStealthMode,
        currentView,
        setView,
        activeUrl,
        navigate,
        history,
        blockedAds,
        blockedTrackers,
        engineProfile,
        setEngineProfile,
        proxySpeed,
        setProxySpeed,
        zoom,
        setZoom,
        isDesktopMode,
        setDesktopMode,
        wallpaper,
        setWallpaper,
        wallet,
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
}

export function useBrowser() {
  const context = useContext(BrowserContext);
  if (!context) throw new Error('useBrowser must be used within BrowserProvider');
  return context;
}