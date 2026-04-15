'use client';

interface StreakCounterProps {
  currentStreak: number;
  totalSuccessfulDays: number;
}

export function StreakCounter({ currentStreak, totalSuccessfulDays }: StreakCounterProps) {
  return (
    <div className="fade-up fade-up-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {/* Streak */}
      <div style={{
        padding: '22px 20px',
        borderRadius: '14px',
        background: 'var(--surface)',
        border: '1px solid var(--surface-high)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,129,58,0.12) 0%, transparent 70%)',
        }} />
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--warm-mid)',
          fontWeight: 500,
          marginBottom: '12px',
        }}>
          Streak
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span className="font-serif" style={{ fontSize: '48px', lineHeight: 1, color: 'var(--amber)', letterSpacing: '-2px' }}>
            {currentStreak}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--warm-mid)' }}>days</span>
        </div>
      </div>

      {/* Total */}
      <div style={{
        padding: '22px 20px',
        borderRadius: '14px',
        background: 'var(--surface)',
        border: '1px solid var(--surface-high)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,124,89,0.08) 0%, transparent 70%)',
        }} />
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--warm-mid)',
          fontWeight: 500,
          marginBottom: '12px',
        }}>
          Total wins
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span className="font-serif" style={{ fontSize: '48px', lineHeight: 1, color: 'var(--parchment)', letterSpacing: '-2px' }}>
            {totalSuccessfulDays}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--warm-mid)' }}>days</span>
        </div>
      </div>
    </div>
  );
}
