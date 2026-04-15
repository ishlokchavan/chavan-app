'use client';

import { DailyRecord } from '../types';

interface WeeklyProgressProps {
  records: DailyRecord[];
}

export function WeeklyProgress({ records }: WeeklyProgressProps) {
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const record = records.find((r) => r.date === dateStr);
    last7Days.push({
      date: dateStr,
      record,
      dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      isToday: i === 0,
    });
  }

  const winCount = last7Days.filter(d => d.record?.isSuccessful).length;

  return (
    <div className="fade-up fade-up-4" style={{
      padding: '22px 20px',
      borderRadius: '14px',
      background: 'var(--surface)',
      border: '1px solid var(--surface-high)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--warm-mid)',
          fontWeight: 500,
        }}>
          This week
        </p>
        <p style={{ fontSize: '12px', color: 'var(--warm-light)', fontWeight: 500 }}>
          {winCount}/7
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {last7Days.map(({ date, record, dayLabel, isToday }) => {
          const status = record === undefined ? 'empty' : record.isSuccessful ? 'win' : 'loss';
          return (
            <div key={date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <p style={{
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: isToday ? 'var(--amber)' : 'var(--warm-mid)',
              }}>
                {dayLabel}
              </p>
              <div style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '8px',
                border: status === 'win'
                  ? '1px solid var(--green)'
                  : status === 'loss'
                  ? '1px solid rgba(192,57,43,0.4)'
                  : isToday
                  ? '1px solid var(--amber)'
                  : '1px solid var(--surface-high)',
                background: status === 'win'
                  ? 'rgba(74,124,89,0.15)'
                  : status === 'loss'
                  ? 'rgba(192,57,43,0.08)'
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {status === 'win' && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 3.5L3.8 7L9 1" stroke="var(--green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {status === 'loss' && (
                  <div style={{ width: '8px', height: '1px', background: 'rgba(192,57,43,0.5)', borderRadius: '1px' }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
