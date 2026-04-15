// Chavan v2 — Type definitions

export type PillarId = 'body' | 'mind' | 'work' | 'bonds';

export interface Pillar {
  id: PillarId;
  name: string;
  letter: string;
  color: string;
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  pillars: Record<PillarId, boolean>;
  xpEarned: number;
  isWin: boolean; // 3+ pillars completed
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Creed {
  level: number;
  text: string;
  unlocked: boolean;
}

export interface AppData {
  version: 2;
  records: Record<string, DailyRecord>; // keyed by YYYY-MM-DD
  totalXp: number;
  currentStreak: number;
  bestStreak: number;
  totalWins: number;
  totalPillarsHit: number;
  badgesUnlocked: string[]; // badge ids
  activeCreedLevel: number;
  startedAt: string;
}

// XP economy
export const XP_PER_PILLAR = 50;
export const XP_DAY_COMPLETE_BONUS = 50; // bonus on top of pillar XP at 3/4

// Level curve: 1000 XP per level (linear for predictability)
export const XP_PER_LEVEL = 1000;

export const PILLARS: Pillar[] = [
  { id: 'body', name: 'Body', letter: 'B', color: '#ff8c2a' },
  { id: 'mind', name: 'Mind', letter: 'M', color: '#f5c542' },
  { id: 'work', name: 'Work', letter: 'W', color: '#ff4d1f' },
  { id: 'bonds', name: 'Bonds', letter: 'R', color: '#5fb87a' },
];

export const CREEDS: Creed[] = [
  { level: 1, text: 'I begin.', unlocked: true },
  { level: 3, text: 'Discipline is my freedom.', unlocked: false },
  { level: 5, text: 'I show up for myself — every day, regardless.', unlocked: false },
  { level: 10, text: 'My standards forge my reality.', unlocked: false },
  { level: 20, text: 'I am the man my younger self prayed for.', unlocked: false },
  { level: 50, text: 'I do not chase. I become.', unlocked: false },
];

export const BADGES: Omit<Badge, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'first_flame', name: 'First Flame', icon: '🔥', description: 'Complete your first day', color: '#ff8c2a' },
  { id: 'streak_7', name: '7-Day Streak', icon: '⚡', description: 'Win 7 days in a row', color: '#f5c542' },
  { id: 'four_pillar', name: 'Four Pillar', icon: '🏛', description: 'Hit all 4 pillars in one day', color: '#ff4d1f' },
  { id: 'first_month', name: 'First Month', icon: '🌱', description: 'Use Chavan for 30 days', color: '#5fb87a' },
  { id: 'streak_30', name: '30-Day Streak', icon: '⚔️', description: 'Win 30 days in a row', color: '#ff4d1f' },
  { id: 'wins_100', name: '100 Wins', icon: '💎', description: 'Reach 100 winning days', color: '#f5c542' },
  { id: 'level_10', name: 'Level 10', icon: '👑', description: 'Reach level 10', color: '#ff8c2a' },
  { id: 'unbroken_week', name: 'Unbroken Week', icon: '🗿', description: 'Hit all 4 pillars every day for a week', color: '#5fb87a' },
  { id: 'streak_100', name: '100-Day Streak', icon: '🌌', description: 'Win 100 days in a row', color: '#ff8c2a' },
];
