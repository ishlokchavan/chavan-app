'use client';

interface StreakCounterProps {
  currentStreak: number;
  totalSuccessfulDays: number;
}

export function StreakCounter({ currentStreak, totalSuccessfulDays }: StreakCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Current Streak */}
      <div className="bg-gray-900 text-white rounded-lg p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Current Streak
        </p>
        <p className="text-5xl font-light mb-2">{currentStreak}</p>
        <p className="text-xs text-gray-400">consecutive days</p>
      </div>

      {/* Total Successful Days */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6">
          Total Days
        </p>
        <p className="text-5xl font-light text-gray-900 mb-2">{totalSuccessfulDays}</p>
        <p className="text-xs text-gray-600">completed</p>
      </div>
    </div>
  );
}
