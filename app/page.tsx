'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DailyTracker } from './components/DailyTracker';
import { StreakCounter } from './components/StreakCounter';
import { WeeklyProgress } from './components/WeeklyProgress';
import { IdentityStatement } from './components/IdentityStatement';
import { DailyReminders } from './components/DailyReminders';
import { AppData, DailyRecord } from './types';
import {
  getTodayDate,
  calculateDaySuccess,
  calculateStreak,
  calculateTotalSuccessfulDays,
  getDefaultAppData,
  createEmptyTasks,
} from './lib/storage';

export default function Home() {
  const [data, setData] = useLocalStorage<AppData>('chavan_data', getDefaultAppData());
  const [todayRecord, setTodayRecord] = useState<DailyRecord | null>(null);
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowInstallPrompt(false);
      setDeferredPrompt(null);
    }
  };

  useEffect(() => {
    setMounted(true);
    const today = getTodayDate();
    let currentData = { ...data };
    let todayRec = currentData.records.find((r) => r.date === today);

    if (!todayRec) {
      todayRec = { date: today, tasks: createEmptyTasks(), isSuccessful: false };
      currentData.records.push(todayRec);
      setData(currentData);
    }
    setTodayRecord(todayRec);
  }, []);

  const handleToggleTask = (taskId: string) => {
    const updated = { ...data };
    const record = updated.records.find((r) => r.date === getTodayDate());
    if (record) {
      const task = record.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : undefined;
        record.isSuccessful = calculateDaySuccess(record.tasks);
        updated.currentStreak = calculateStreak(updated.records);
        updated.totalSuccessfulDays = calculateTotalSuccessfulDays(updated.records);
        setData(updated);
        setTodayRecord({ ...record });
      }
    }
  };

  if (!mounted || !todayRecord) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh' }}>
        <div style={{
          width: '24px', height: '24px',
          borderRadius: '50%',
          border: '2px solid var(--surface-high)',
          borderTopColor: 'var(--amber)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100dvh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(26,23,20,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--surface-raised)',
      }}>
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h1 className="font-serif" style={{
              fontSize: '22px',
              color: 'var(--parchment)',
              letterSpacing: '0.01em',
              lineHeight: 1,
            }}>
              Chavan
            </h1>
            <p style={{
              fontSize: '10px',
              color: 'var(--warm-mid)',
              marginTop: '2px',
              letterSpacing: '0.08em',
              fontWeight: 300,
            }}>
              Daily framework
            </p>
          </div>

          {showInstallPrompt && (
            <button
              onClick={handleInstall}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'var(--amber)',
                color: 'var(--ink)',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              Install
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '24px 20px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <DailyReminders />
        <DailyTracker tasks={todayRecord.tasks} onToggleTask={handleToggleTask} />

        {/* Divider */}
        <div className="divider" />

        <StreakCounter
          currentStreak={data.currentStreak}
          totalSuccessfulDays={data.totalSuccessfulDays}
        />
        <WeeklyProgress records={data.records} />
        <IdentityStatement />

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: '11px',
          color: 'var(--surface-high)',
          paddingTop: '8px',
          letterSpacing: '0.06em',
        }}>
          © 2026 Chavan
        </p>
      </div>
    </main>
  );
}
