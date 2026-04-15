'use client';

import { dayMessage } from '../lib/storage';
import { XP_PER_PILLAR, XP_DAY_COMPLETE_BONUS } from '../types';

export function DayStatus({ completed }: { completed: number }) {
  const isWin = completed >= 3;
  const pct = (completed / 4) * 100;

  let bonusText = '';
  if (completed < 3) {
    const remaining = 3 - completed;
    bonusText = `+${remaining * XP_PER_PILLAR + XP_DAY_COMPLETE_BONUS} XP TO UNLOCK WIN`;
  } else if (completed === 3) {
    bonusText = `+${XP_PER_PILLAR} XP IF YOU HIT THE FOURTH`;
  } else {
    bonusText = 'PERFECT DAY · BONUS XP EARNED';
  }

  return (
    <div
      className="fade-in"
      style={{
        background: isWin
          ? 'linear-gradient(145deg, rgba(95,184,122,0.06), var(--bg-2))'
          : 'linear-gradient(145deg, var(--bg-1), var(--bg-2))',
        border: `1px solid ${isWin ? 'rgba(95,184,122,0.3)' : 'var(--line)'}`,
        borderRadius: 20,
        padding: 22,
        marginBottom: 36,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
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
          TODAY
        </div>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 32,
            color: isWin ? 'var(--moss)' : 'var(--ink)',
            lineHeight: 1,
          }}
        >
          {completed}
          <span style={{ color: 'var(--ink-faint)', fontSize: 18 }}> / 4</span>
        </div>
      </div>

      <div
        style={{
          height: 4,
          background: 'var(--bg)',
          borderRadius: 100,
          overflow: 'hidden',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: isWin
              ? 'linear-gradient(90deg, var(--moss), #8fd9a6)'
              : 'linear-gradient(90deg, var(--amber), var(--gold))',
            borderRadius: 100,
            transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 16,
          color: 'var(--ink)',
          lineHeight: 1.4,
        }}
      >
        {dayMessage(completed)}
      </div>
      <div
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10,
          color: 'var(--ink-dim)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginTop: 6,
        }}
      >
        {bonusText}
      </div>
    </div>
  );
}
