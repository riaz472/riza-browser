
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type BrowserView = 'home' | 'browser' | 'terminal' | 'wallet';

interface BrowserContextType {
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  currentView: BrowserView;
  setView: (view: BrowserView) => void;
  activeUrl: string;
  navigate: (url: string) => void;
  blockedAds: number;
  blockedTrackers: number;
  zoom: number;
  setZoom: (z: number) => void;
  isDesktopMode: boolean;
  setDesktopMode: (v: boolean) => void;
  wallpaper: { type: 'image' | 'video', url: string };
  setWallpaper: (w: { type: 'image' | 'video', url: string }) => void;
  wallet: {
    balance: number;
    address: string;
    isLocked: boolean;
    setLocked: (v: boolean) => void;
  };
}

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

export function BrowserProvider({ children }: { children: React.ReactNode }) {
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [currentView, setCurrentView] = useState<BrowserView>('home');
  const [activeUrl, setActiveUrl] = useState('');
  const [blockedAds, setBlockedAds] = useState(1204);
  const [blockedTrackers, setBlockedTrackers] = useState(842);
  const [zoom, setZoom] = useState(100);
  const [isDesktopMode, setDesktopMode] = useState(false);
  const [wallpaper, setWallpaper] = useState<{ type: 'image' | 'video', url: string }>({
    type: 'image',
    url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop'
  });
  const [isWalletLocked, setIsWalletLocked] = useState(true);

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
      if (next) document.documentElement.classList.add('stealth-mode');
      else document.documentElement.classList.remove('stealth-mode');
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
        blockedAds,
        blockedTrackers,
        zoom,
        setZoom,
        isDesktopMode,
        setDesktopMode,
        wallpaper,
        setWallpaper,
        wallet: {
          balance: 420.69,
          address: '0xRIZA...9902-B',
          isLocked: isWalletLocked,
          setLocked: setIsWalletLocked
        },
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
