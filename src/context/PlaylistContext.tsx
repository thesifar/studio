"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Bhajan } from '@/lib/mock-data';

interface PlaylistContextType {
  queue: Bhajan[];
  addToQueue: (bhajan: Bhajan) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Bhajan[]>([]);

  const addToQueue = (bhajan: Bhajan) => {
    if (!queue.find(item => item.id === bhajan.id)) {
      setQueue(prev => [...prev, bhajan]);
    }
  };

  const removeFromQueue = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  const clearQueue = () => setQueue([]);

  return (
    <PlaylistContext.Provider value={{ queue, addToQueue, removeFromQueue, clearQueue }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
}