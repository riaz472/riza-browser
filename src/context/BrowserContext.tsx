
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type BrowserView = 'home' | 'analyzer' | 'terminal' | 'settings' | 'extensions';

interface BrowserContextType {
  isStealthMode: boolean;
  toggleStealthMode: () => void;
  currentView: BrowserView;
  setView: (view: BrowserView) => void;
  blockedAds: number;
  blockedTrackers: number;
  engineProfile: string;
  setEngineProfile: (p: string) => void;
  proxySpeed: 'standard' | 'hyper' | 'stealth';
  setProxySpeed: (s: 'standard' | 'hyper' | 'stealth') => void;
  fingerprintProtection: {
    webRTC: boolean;
    geoSpoofing: string;
    canvasMixing: boolean;
  };
  setFingerprintProtection: (p: any) => void;
}

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

export function BrowserProvider({ children }: { children: React.ReactNode }) {
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [currentView, setCurrentView] = useState<BrowserView>('home');
  const [blockedAds, setBlockedAds] = useState(0);
  const [blockedTrackers, setBlockedTrackers] = useState(0);
  const [engineProfile, setEngineProfile] = useState('Chrome 122 (macOS)');
  const [proxySpeed, setProxySpeed] = useState<'standard' | 'hyper' | 'stealth'>('standard');
  const [fingerprintProtection, setFingerprintProtection] = useState({
    webRTC: true,
    geoSpoofing: 'London, UK',
    canvasMixing: true,
  });

  // Simulated shield counters
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockedAds(prev => prev + Math.floor(Math.random() * 2));
      setBlockedTrackers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleStealthMode = () => {
    setIsStealthMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('stealth-mode');
        // Simulate blocking persistence
        localStorage.clear();
        sessionStorage.clear();
      } else {
        document.documentElement.classList.remove('stealth-mode');
      }
      return next;
    });
  };

  const setView = (view: BrowserView) => setCurrentView(view);

  return (
    <BrowserContext.Provider
      value={{
        isStealthMode,
        toggleStealthMode,
        currentView,
        setView,
        blockedAds,
        blockedTrackers,
        engineProfile,
        setEngineProfile,
        proxySpeed,
        setProxySpeed,
        fingerprintProtection,
        setFingerprintProtection,
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
