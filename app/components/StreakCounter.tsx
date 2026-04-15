'use client';

interface StreakCounterProps {
  currentStreak: number;
  totalSuccessfulDays: number;
}

export function StreakCounter({ currentStreak, totalSuccessfulDays }: StreakCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Current Streak */}
      <div className="bg-black text-white rounded-lg p-6 text-center">
        <p className="text-sm font-semibold opacity-90 mb-2">STREAK</p>
        <p className="text-5xl font-bold">{currentStreak}</p>
        <p className="text-xs mt-3 opacity-75">days</p>
      </div>

      {/* Total Successful Days */}
      <div className="border-2 border-black rounded-lg p-6 text-center bg-white">
        <p className="text-sm font-semibold text-black mb-2">TOTAL</p>
        <p className="text-5xl font-bold text-black">{totalSuccessfulDays}</p>
        <p className="text-xs mt-3 text-gray-700">successful days</p>
      </div>
    </div>
  );
}
