'use client';

import { DailyRecord } from '../types';
import { dateKey, isWinDay, pillarsCompleted } from '../lib/storage';

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function WeeklyProgress({ records }: { records: Record<string, DailyRecord> }) {
  const today = new Date();
  const todayStr = dateKey(today);

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    const rec = records[key];
    const completed = rec ? pillarsCompleted(rec) : 0;
    days.push({
      date: d,
      label: DAY_LABELS[d.getDay()],
      num: d.getDate(),
      isWin: rec ? isWinDay(rec) : false,
      isPartial: completed > 0 && completed < 3,
      isToday: key === todayStr,
    });
  }

  return (
    <div className="fade-in" style={{ marginBottom: 36 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: 'var(--ink-dim)',
          }}
        >
          THIS WEEK
        </div>
        <div
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(90deg, var(--line-strong), transparent)',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
        {days.map((d, i) => {
          let bg = 'var(--bg-1)';
          let borderColor = 'var(--line)';
          let labelColor = 'var(--ink-dim)';
          let numColor = 'var(--ink)';
          let dotColor = 'var(--ink-faint)';
          let dotShow = true;
          let boxShadow = 'none';

          if (d.isWin) {
            bg = 'linear-gradient(145deg, var(--moss), #4a9663)';
            borderColor = 'var(--moss)';
            labelColor = 'rgba(0,0,0,0.6)';
            numColor = '#000';
            dotShow = false;
          } else if (d.isPartial) {
            bg = 'linear-gradient(145deg, var(--bg-2), var(--bg-1))';
            borderColor = 'var(--line-strong)';
            dotColor = 'var(--amber)';
          }

          if (d.isToday) {
            borderColor = 'var(--amber)';
            boxShadow = '0 0 16px rgba(255,140,42,0.3)';
          }

          return (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                background: bg,
                border: `1px solid ${borderColor}`,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                position: 'relative',
                overflow: 'hidden',
                boxShadow,
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: labelColor,
                  lineHeight: 1,
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 16,
                  color: numColor,
                  fontStyle: 'italic',
                  lineHeight: 1,
                }}
              >
                {d.num}
              </div>
              {dotShow && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: dotColor,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
