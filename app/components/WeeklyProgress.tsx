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
      <h2 className="text-lg font-bold text-black">Weekly Progress</h2>
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map(({ date, record, dayLabel }) => (
          <div key={date} className="text-center">
            <p className="text-xs font-semibold mb-2 text-gray-700">{dayLabel}</p>
            <div
              className={`h-12 rounded-lg border-2 flex items-center justify-center font-bold transition-all ${
                record === undefined
                  ? 'border-gray-400 bg-gray-100 text-gray-600'
                  : record.isSuccessful
                  ? 'border-green-600 bg-green-500 text-white'
                  : 'border-red-600 bg-red-500 text-white'
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
