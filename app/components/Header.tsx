'use client';

import { formatHeaderDate, levelFromXp } from '../lib/storage';

export function Header({ totalXp }: { totalXp: number }) {
  const level = levelFromXp(totalXp);
  return (
    <div
      className="fade-in"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 28,
            fontStyle: 'italic',
            letterSpacing: '-0.5px',
            lineHeight: 1,
            color: 'var(--ink)',
          }}
        >
          chav<span style={{ color: 'var(--amber)' }}>a</span>n
        </div>
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--ink-dim)',
            marginTop: 6,
          }}
        >
          {formatHeaderDate(new Date())}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 32,
            lineHeight: 1,
            color: 'var(--amber)',
            fontStyle: 'italic',
          }}
        >
          {String(level).padStart(2, '0')}
        </div>
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 9,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--ink-dim)',
          }}
        >
          LEVEL
        </div>
      </div>
    </div>
  );
}
