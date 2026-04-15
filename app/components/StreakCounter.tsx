'use client';

interface StreakCounterProps {
  currentStreak: number;
  totalSuccessfulDays: number;
}

export function StreakCounter({ currentStreak, totalSuccessfulDays }: StreakCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Current Streak */}
      <div className="bg-black dark:bg-white text-white dark:text-black rounded-lg p-6 text-center">
        <p className="text-sm font-semibold opacity-80 mb-1">STREAK</p>
        <p className="text-4xl font-bold">{currentStreak}</p>
        <p className="text-xs mt-2 opacity-70">days</p>
      </div>

      {/* Total Successful Days */}
      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
        <p className="text-sm font-semibold opacity-80 mb-1">TOTAL</p>
        <p className="text-4xl font-bold">{totalSuccessfulDays}</p>
        <p className="text-xs mt-2 opacity-70">successful days</p>
      </div>
    </div>
  );
}
