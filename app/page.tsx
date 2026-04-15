'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DailyTracker } from './components/DailyTracker';
import { StreakCounter } from './components/StreakCounter';
import { WeeklyProgress } from './components/WeeklyProgress';
import { IdentityStatement } from './components/IdentityStatement';
import { DailyReminders } from './components/DailyReminders';
import {
  AppData,
  DailyRecord,
} from './types';
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

  // Handle PWA install prompt
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
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  // Initialize on mount
  useEffect(() => {
    setMounted(true);

    // Ensure today's record exists
    const today = getTodayDate();
    let currentData = { ...data };
    let todayRec = currentData.records.find((r) => r.date === today);

    if (!todayRec) {
      todayRec = {
        date: today,
        tasks: createEmptyTasks(),
        isSuccessful: false,
      };
      currentData.records.push(todayRec);
      setData(currentData);
    }

    setTodayRecord(todayRec);
  }, []);

  if (!mounted || !todayRecord) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleToggleTask = (taskId: string) => {
    const updated = { ...data };
    const record = updated.records.find((r) => r.date === getTodayDate());

    if (record) {
      const task = record.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : undefined;

        // Update success status
        record.isSuccessful = calculateDaySuccess(record.tasks);

        // Update streak and total
        updated.currentStreak = calculateStreak(updated.records);
        updated.totalSuccessfulDays = calculateTotalSuccessfulDays(updated.records);

        setData(updated);
        setTodayRecord(record);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-2xl mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light tracking-tight">Chavan</h1>
            <p className="text-xs text-gray-500 mt-1 font-light">Self-improvement framework</p>
          </div>
          {showInstallPrompt && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Install App
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-12">
        {/* Daily Reminders */}
        <DailyReminders />

        {/* Daily Tracker Section */}
        <section className="space-y-6">
          <DailyTracker
            tasks={todayRecord.tasks}
            onToggleTask={handleToggleTask}
          />
        </section>

        {/* Streak Counter Section */}
        <section className="space-y-4">
          <StreakCounter
            currentStreak={data.currentStreak}
            totalSuccessfulDays={data.totalSuccessfulDays}
          />
        </section>

        {/* Weekly Progress Section */}
        <section className="space-y-4">
          <WeeklyProgress records={data.records} />
        </section>

        {/* Identity Statement Section */}
        <section className="space-y-4">
          <IdentityStatement />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 mt-8">
          <p className="text-xs text-gray-500 font-light">
            © 2026 Chavan. Daily self-improvement.
          </p>
        </footer>
      </div>
    </main>
  );
}
