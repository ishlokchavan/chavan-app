'use client';

import { DailyRecord } from '../types';

interface WeeklyProgressProps {
  records: DailyRecord[];
}

export function WeeklyProgress({ records }: WeeklyProgressProps) {
  // Get last 7 days
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const record = records.find((r) => r.date === dateStr);
    last7Days.push({
      date: dateStr,
      record,
      dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-600">
        Last 7 Days
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map(({ date, record, dayLabel }) => (
          <div key={date} className="flex flex-col items-center gap-2">
            <p className="text-xs font-medium text-gray-600">{dayLabel}</p>
            <div
              className={`w-full aspect-square rounded-md border flex items-center justify-center font-semibold text-sm transition-all ${
                record === undefined
                  ? 'border-gray-200 bg-gray-50 text-gray-400'
                  : record.isSuccessful
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-red-600 bg-red-50 text-red-700'
              }`}
            >
              {record === undefined ? '—' : record.isSuccessful ? '✓' : '✗'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
