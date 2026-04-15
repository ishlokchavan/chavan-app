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
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {/* Header */}
      <header className="border-b border-gray-300 dark:border-gray-700 sticky top-0 bg-white dark:bg-black z-40 pt-16 pb-4">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight">Chavan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            You're just a man. Improve every day.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
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
