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
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-2 border-gray-300 sticky top-0 bg-white z-40 pt-6 pb-4 fixed w-full">
        <div className="max-w-2xl mx-auto px-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">Chavan</h1>
            <p className="text-sm text-gray-700 mt-1">
              You're just a man. Improve every day.
            </p>
          </div>
          {showInstallPrompt && (
            <button
              onClick={handleInstall}
              className="px-3 py-2 bg-black text-white rounded-lg text-xs font-semibold whitespace-nowrap ml-4 hover:bg-gray-800"
            >
              📱 Install
            </button>
          )}
        </div>
      </header>

      {/* Content with top padding for fixed header */}
      <div className="max-w-2xl mx-auto px-4 py-6 mt-28 space-y-8">
        {/* Daily Reminders */}
        <DailyReminders />

        {/* Daily Tracker */}
        <section>
          <DailyTracker
            tasks={todayRecord.tasks}
            onToggleTask={handleToggleTask}
          />
        </section>

        {/* Streak Counter */}
        <section>
          <StreakCounter
            currentStreak={data.currentStreak}
            totalSuccessfulDays={data.totalSuccessfulDays}
          />
        </section>

        {/* Weekly Progress */}
        <section>
          <WeeklyProgress records={data.records} />
        </section>

        {/* Identity Statement */}
        <section>
          <IdentityStatement />
        </section>

        {/* Footer Spacing */}
        <div className="pb-8" />
      </div>
    </main>
  );
}
