'use client';

import { activeCreedText } from '../lib/storage';

export function IdentityCreed({ activeCreedLevel }: { activeCreedLevel: number }) {
  const text = activeCreedText(activeCreedLevel);

  // Find the keyword to highlight (heuristic: first quoted-feel noun)
  // Simple approach: render the full text in italic with one accent
  return (
    <div
      className="fade-in"
      style={{
        background: 'linear-gradient(145deg, rgba(255,140,42,0.08), var(--bg-2))',
        border: '1px solid rgba(255,140,42,0.2)',
        borderRadius: 24,
        padding: '28px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: -20,
          left: 16,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 120,
          color: 'rgba(255,140,42,0.15)',
          lineHeight: 1,
        }}
      >
        "
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 22,
          lineHeight: 1.3,
          color: 'var(--ink)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--ink-dim)',
          marginTop: 14,
          position: 'relative',
          zIndex: 1,
        }}
      >
        — DAILY CREED
      </div>
    </div>
  );
}
