'use client';

import { useState } from 'react';

type Tab = 'today' | 'history' | 'insights' | 'profile';

export function BottomNav() {
  const [active, setActive] = useState<Tab>('today');
  const [toast, setToast] = useState<string | null>(null);

  function handleClick(tab: Tab) {
    if (tab === 'today') {
      setActive(tab);
      return;
    }
    setToast('Coming soon');
    setTimeout(() => setToast(null), 1400);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(8);
    }
  }

  const items: { tab: Tab; label: string; svg: JSX.Element }[] = [
    {
      tab: 'today',
      label: 'Today',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      tab: 'history',
      label: 'History',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      tab: 'insights',
      label: 'Insights',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
      ),
    },
    {
      tab: 'profile',
      label: 'Profile',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          bottom: 'calc(16px + env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 18, 16, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--line-strong)',
          borderRadius: 100,
          padding: 8,
          display: 'flex',
          gap: 4,
          zIndex: 50,
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }}
      >
        {items.map(it => {
          const isActive = active === it.tab;
          return (
            <button
              key={it.tab}
              onClick={() => handleClick(it.tab)}
              title={it.label}
              style={{
                width: 48,
                height: 48,
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? '#000' : 'var(--ink-dim)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: 'none',
                background: isActive ? 'var(--amber)' : 'transparent',
                boxShadow: isActive ? '0 4px 16px rgba(255,140,42,0.4)' : 'none',
              }}
            >
              {it.svg}
            </button>
          );
        })}
      </nav>
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(96px + env(safe-area-inset-bottom))',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(28, 25, 22, 0.95)',
            border: '1px solid var(--line-strong)',
            color: 'var(--ink)',
            padding: '10px 18px',
            borderRadius: 100,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            zIndex: 60,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.2s',
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}
