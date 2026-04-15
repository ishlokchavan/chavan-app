'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppData } from '../types';
import { loadData, saveData, defaultData, wipeLegacy, STORAGE_KEY } from '../lib/storage';

export function useAppData(): [AppData, (updater: (prev: AppData) => AppData) => void, boolean] {
  const [data, setData] = useState<AppData>(defaultData());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    wipeLegacy();
    setData(loadData());
    setHydrated(true);
  }, []);

  const update = useCallback((updater: (prev: AppData) => AppData) => {
    setData(prev => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {}
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return [data, update, hydrated];
}
