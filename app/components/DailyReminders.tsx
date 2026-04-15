'use client';

import { useEffect, useState } from 'react';

export function DailyReminders() {
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();

    // Morning reminder (6 AM - 12 PM)
    if (hour >= 6 && hour < 12) {
      setReminder('Build something meaningful today.');
    }
    // Night reminder (6 PM - 11 PM)
    else if (hour >= 18 && hour < 23) {
      setReminder('How did you perform today?');
    }
  }, []);

  if (!reminder) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-5 text-center border border-gray-200">
      <p className="text-sm text-gray-700 font-light">{reminder}</p>
    </div>
  );
}
