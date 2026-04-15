'use client';

import { Task, PILLARS } from '../types';

interface DailyTrackerProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const PILLAR_ICONS: Record<string, { icon: string; label: string }> = {
  body: { icon: 'B', label: 'Body' },
  mind: { icon: 'M', label: 'Mind' },
  work: { icon: 'W', label: 'Work' },
  relationships: { icon: 'R', label: 'Bonds' },
};

export function DailyTracker({ tasks, onToggleTask }: DailyTrackerProps) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const isSuccessful = completedCount >= 3;

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Date header */}
      <div className="fade-up fade-up-1">
        <p style={{ color: 'var(--warm-light)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
          {dayName}, {dateStr}
        </p>
        <h2 className="font-serif" style={{ fontSize: '28px', lineHeight: 1.2, color: 'var(--parchment)', marginTop: '4px' }}>
          Today's practice
        </h2>
      </div>

      {/* Progress bar */}
      <div className="fade-up fade-up-2" style={{ height: '2px', background: 'var(--surface-raised)', borderRadius: '1px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(completedCount / 4) * 100}%`,
            background: isSuccessful ? 'var(--green-light)' : 'var(--amber)',
            borderRadius: '1px',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* Task Grid */}
      <div className="fade-up fade-up-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {tasks.map((task, i) => {
          const meta = PILLAR_ICONS[task.id];
          return (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className="pillar-card"
              style={{
                padding: '20px 18px',
                borderRadius: '14px',
                border: task.completed
                  ? '1px solid var(--amber)'
                  : '1px solid var(--surface-high)',
                background: task.completed
                  ? 'linear-gradient(135deg, var(--surface-raised) 0%, rgba(212,129,58,0.12) 100%)'
                  : 'var(--surface)',
                textAlign: 'left',
                minHeight: '130px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Glow if completed */}
              {task.completed && (
                <div style={{
                  position: 'absolute',
                  top: 0, right: 0,
                  width: '60px', height: '60px',
                  background: 'radial-gradient(circle, rgba(212,129,58,0.2) 0%, transparent 70%)',
                  borderRadius: '0 14px 0 0',
                }} />
              )}

              <div>
                {/* Letter mark */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: task.completed ? 'var(--amber)' : 'var(--surface-high)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '16px',
                  color: task.completed ? 'var(--ink)' : 'var(--warm-light)',
                  fontWeight: 400,
                  transition: 'all 0.2s ease',
                }}>
                  {meta.icon}
                </div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: task.completed ? 'var(--parchment)' : 'var(--warm-light)',
                  lineHeight: 1.2,
                }}>
                  {meta.label}
                </p>
              </div>

              {/* Check indicator */}
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: task.completed ? '1px solid var(--amber)' : '1px solid var(--surface-high)',
                background: task.completed ? 'var(--amber)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {task.completed && (
                  <svg className="check-pop" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 3.5L3.8 7L9 1" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Status card */}
      <div
        className="fade-up fade-up-3"
        style={{
          padding: '20px 24px',
          borderRadius: '14px',
          border: isSuccessful ? '1px solid var(--green)' : '1px solid var(--surface-high)',
          background: isSuccessful
            ? 'linear-gradient(135deg, var(--surface) 0%, rgba(74,124,89,0.1) 100%)'
            : 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{
            fontSize: '16px',
            fontWeight: 500,
            color: isSuccessful ? 'var(--green-light)' : 'var(--warm-light)',
          }}>
            {isSuccessful ? 'Strong day' : completedCount === 0 ? 'Start your practice' : 'Keep going'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--warm-mid)', marginTop: '2px' }}>
            {completedCount} of 4 · need 3 to win
          </p>
        </div>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: isSuccessful ? '1.5px solid var(--green)' : '1.5px solid var(--surface-high)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'DM Serif Display', serif",
          fontSize: '20px',
          color: isSuccessful ? 'var(--green-light)' : 'var(--warm-mid)',
        }}>
          {completedCount}
        </div>
      </div>
    </div>
  );
}
