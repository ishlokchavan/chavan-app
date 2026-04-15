'use client';

import { useState } from 'react';
import { useAppData } from './hooks/useLocalStorage';
import { togglePillar, todayKey, defaultRecord, pillarsCompleted, GameEvent } from './lib/storage';
import { PILLARS, PillarId } from './types';
import { Header } from './components/Header';
import { StreakHero } from './components/StreakHero';
import { XpBar } from './components/XpBar';
import { PillarGrid } from './components/PillarGrid';
import { DayStatus } from './components/DayStatus';
import { WeeklyProgress } from './components/WeeklyProgress';
import { IdentityCreed } from './components/IdentityCreed';
import { CelebrationModal } from './components/CelebrationModal';
import { BottomNav } from './components/BottomNav';

export default function HomePage() {
  const [data, update, hydrated] = useAppData();
  const [celebration, setCelebration] = useState<{ show: boolean; xp: number; streak: number }>({
    show: false,
    xp: 0,
    streak: 0,
  });

  const today = todayKey();
  const todayRec = data.records[today] || defaultRecord(today);
  const pillarState = todayRec.pillars;
  const completed = pillarsCompleted(todayRec);

  function handleToggle(id: PillarId) {
    let allEvents: GameEvent[] = [];
    update(prev => {
      const { data: next, events } = togglePillar(prev, id);
      allEvents = events;
      return next;
    });
    // Process events after state settles
    setTimeout(() => {
      const completeEvent = allEvents.find(e => e.type === 'day_complete');
      if (completeEvent && completeEvent.type === 'day_complete') {
        setCelebration({ show: true, xp: completeEvent.xp, streak: completeEvent.streak });
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([30, 50, 80]);
        }
      }
    }, 350);
  }

  // SSR guard — render skeleton until LocalStorage hydrates so server/client match
  if (!hydrated) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <PhoneFrame>
          <div style={{ padding: '56px 24px', opacity: 0.3 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontStyle: 'italic' }}>
              chav<span style={{ color: 'var(--amber)' }}>a</span>n
            </div>
          </div>
        </PhoneFrame>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <PhoneFrame>
        <div
          className="no-scrollbar"
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '56px 24px 140px',
          }}
        >
          <Header totalXp={data.totalXp} />
          <StreakHero currentStreak={data.currentStreak} bestStreak={data.bestStreak} />
          <XpBar totalXp={data.totalXp} />
          <PillarGrid pillars={PILLARS} state={pillarState} onToggle={handleToggle} />
          <DayStatus completed={completed} />
          <WeeklyProgress records={data.records} />
          <IdentityCreed activeCreedLevel={data.activeCreedLevel} />
        </div>
        <BottomNav />
      </PhoneFrame>

      <CelebrationModal
        show={celebration.show}
        xp={celebration.xp}
        streak={celebration.streak}
        onClose={() => setCelebration(c => ({ ...c, show: false }))}
      />
    </main>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 480,
        minHeight: '100vh',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ambient gradient layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(255,140,42,0.12) 0%, transparent 60%), radial-gradient(ellipse 80% 40% at 100% 30%, rgba(255,77,31,0.06) 0%, transparent 60%), radial-gradient(ellipse 80% 40% at 0% 70%, rgba(95,184,122,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* noise overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.5,
          mixBlendMode: 'overlay',
        }}
      />
      {children}
    </div>
  );
}
