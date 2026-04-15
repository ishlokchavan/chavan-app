'use client';

interface Props {
  show: boolean;
  xp: number;
  streak: number;
  onClose: () => void;
}

export function CelebrationModal({ show, xp, streak, onClose }: Props) {
  if (!show) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: 24,
        animation: 'fadeIn 0.3s',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, var(--bg-1), var(--bg-2))',
          border: '1px solid var(--amber)',
          borderRadius: 32,
          padding: '48px 32px',
          textAlign: 'center',
          maxWidth: 320,
          boxShadow: '0 0 80px rgba(255,140,42,0.4)',
          animation: 'pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 8 }}>⚡</div>
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            letterSpacing: '3px',
            color: 'var(--ink-dim)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          DAY COMPLETE
        </div>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 36,
            color: 'var(--ink)',
            marginBottom: 8,
          }}
        >
          +{xp} XP
        </div>
        <div
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--amber)',
            marginBottom: 24,
          }}
        >
          {streak === 1 ? 'Streak begun.' : `Streak extended to ${streak}`}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'var(--amber)',
            color: '#000',
            border: 'none',
            padding: '14px 32px',
            borderRadius: 100,
            fontFamily: "'Geist', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            letterSpacing: '0.5px',
          }}
        >
          KEEP GOING
        </button>
      </div>
    </div>
  );
}
