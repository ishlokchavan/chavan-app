'use client';

export function StreakHero({ currentStreak, bestStreak }: { currentStreak: number; bestStreak: number }) {
  return (
    <div
      className="fade-in"
      style={{ position: 'relative', marginBottom: 36, textAlign: 'center', padding: '32px 0 24px' }}
    >
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(255,140,42,0.25) 0%, transparent 65%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          animation: 'pulse-glow 4s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          fontSize: 72,
          lineHeight: 1,
          marginBottom: 8,
          filter: 'drop-shadow(0 0 24px rgba(255,140,42,0.6))',
          animation: 'flicker 2.5s ease-in-out infinite',
        }}
      >
        🔥
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 96,
          lineHeight: 0.9,
          background: 'linear-gradient(180deg, #fff 0%, var(--amber) 60%, var(--ember) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-3px',
          position: 'relative',
        }}
      >
        {currentStreak}
      </div>
      <div
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '4px',
          color: 'var(--ink-dim)',
          marginTop: 8,
        }}
      >
        DAY STREAK
      </div>
      {bestStreak > 0 && (
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            color: 'var(--amber)',
            marginTop: 12,
            letterSpacing: 1,
          }}
        >
          PERSONAL BEST · {bestStreak} DAY{bestStreak === 1 ? '' : 'S'}
        </div>
      )}
    </div>
  );
}
