'use client';

import { useEffect, useState } from 'react';

const MORNING_PHRASES = [
  'What will you build today?',
  'The day is blank. Fill it well.',
  'A strong day starts with intention.',
];
const EVENING_PHRASES = [
  'How did you show up today?',
  'Reflect before you rest.',
  'Every day counts. Did this one?',
];

export function DailyReminders() {
  const [reminder, setReminder] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    const phrases = hour >= 6 && hour < 12
      ? MORNING_PHRASES
      : hour >= 18 && hour < 23
      ? EVENING_PHRASES
      : [];

    if (phrases.length > 0) {
      const idx = new Date().getDate() % phrases.length;
      setReminder(phrases[idx]);
      setTime(hour >= 6 && hour < 12 ? 'Morning' : 'Evening');
    }
  }, []);

  if (!reminder) return null;

  return (
    <div className="fade-up fade-up-1" style={{
      padding: '14px 18px',
      borderRadius: '10px',
      background: 'transparent',
      border: '1px solid var(--surface-high)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'var(--amber)',
        flexShrink: 0,
      }} />
      <p style={{ fontSize: '13px', color: 'var(--warm-light)', fontWeight: 300, fontStyle: 'italic' }}>
        {reminder}
      </p>
    </div>
  );
}
