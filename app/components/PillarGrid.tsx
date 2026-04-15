'use client';

import { useRef } from 'react';
import { Pillar, PillarId } from '../types';

interface Props {
  pillars: Pillar[];
  state: Record<PillarId, boolean>;
  onToggle: (id: PillarId) => void;
}

export function PillarGrid({ pillars, state, onToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClick(id: PillarId, color: string, e: React.MouseEvent<HTMLDivElement>) {
    const willBeDone = !state[id];
    onToggle(id);

    if (willBeDone) {
      // haptics
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(20);
      }
      // particle burst from element center
      const el = e.currentTarget;
      const container = containerRef.current;
      if (!container) return;
      const elRect = el.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const cx = elRect.left - cRect.left + elRect.width / 2;
      const cy = elRect.top - cRect.top + elRect.height / 2;
      for (let i = 0; i < 14; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.background = color;
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        const angle = (Math.PI * 2 * i) / 14;
        const dist = 60 + Math.random() * 40;
        p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        container.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    }
  }

  return (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 18,
          marginTop: 4,
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
          TODAY'S PILLARS
        </div>
        <div
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(90deg, var(--line-strong), transparent)',
          }}
        />
      </div>

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 36,
          position: 'relative',
        }}
      >
        {pillars.map(p => {
          const done = state[p.id];
          return (
            <div
              key={p.id}
              onClick={e => handleClick(p.id, p.color, e)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                background: 'linear-gradient(145deg, var(--bg-1), var(--bg-2))',
                border: `1px solid ${done ? p.color : 'var(--line)'}`,
                borderRadius: 24,
                padding: 18,
                cursor: 'pointer',
                transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.96)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.96)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {/* glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: -1,
                  borderRadius: 24,
                  background: `radial-gradient(circle at 50% 100%, ${p.color}, transparent 70%)`,
                  opacity: done ? 0.25 : 0,
                  transition: 'opacity 0.5s',
                  pointerEvents: 'none',
                }}
              />
              {/* check badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: p.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: done ? 1 : 0,
                  transform: done ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-90deg)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 2,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {/* letter */}
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: 64,
                  lineHeight: 0.8,
                  color: done ? p.color : 'var(--ink)',
                  textShadow: done ? `0 0 24px ${p.color}` : 'none',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.letter}
              </div>
              {/* meta */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: done ? 'var(--ink)' : 'var(--ink-dim)',
                    fontWeight: 500,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 9,
                    color: done ? p.color : 'var(--ink-faint)',
                    letterSpacing: 1,
                  }}
                >
                  +50 XP
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
