'use client';

import { useEffect, useState } from 'react';

export function DailyReminders() {
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();

    // Morning reminder (6 AM - 12 PM)
    if (hour >= 6 && hour < 12) {
      setReminder('Win the day. Build the man.');
    }
    // Night reminder (6 PM - 11 PM)
    else if (hour >= 18 && hour < 23) {
      setReminder('Did you improve today?');
    }
  }, []);

  if (!reminder) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-300 dark:border-gray-700">
      <p className="font-semibold text-sm">{reminder}</p>
    </div>
  );
}
