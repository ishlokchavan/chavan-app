'use client';

import { levelFromXp, xpInCurrentLevel, levelProgress } from '../lib/storage';
import { XP_PER_LEVEL } from '../types';

export function XpBar({ totalXp }: { totalXp: number }) {
  const level = levelFromXp(totalXp);
  const inLevel = xpInCurrentLevel(totalXp);
  const pct = levelProgress(totalXp) * 100;

  return (
    <div className="fade-in" style={{ marginBottom: 32 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--ink-dim)',
          }}
        >
          PROGRESS TO LEVEL {String(level + 1).padStart(2, '0')}
        </div>
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 12,
            color: 'var(--ink)',
            fontWeight: 500,
          }}
        >
          {inLevel}
          <span style={{ color: 'var(--ink-dim)' }}> / {XP_PER_LEVEL} XP</span>
        </div>
      </div>
      <div
        style={{
          height: 6,
          background: 'var(--bg-2)',
          borderRadius: 100,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--ember) 0%, var(--amber) 50%, var(--gold) 100%)',
            borderRadius: 100,
            boxShadow: '0 0 12px rgba(255,140,42,0.5)',
            position: 'relative',
            transformOrigin: 'left',
            transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            style={{
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shimmer 2.5s linear infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}
