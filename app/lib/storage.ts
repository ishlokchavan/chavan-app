// Chavan v2 — Storage + game logic

import {
  AppData,
  DailyRecord,
  PillarId,
  PILLARS,
  XP_PER_PILLAR,
  XP_DAY_COMPLETE_BONUS,
  XP_PER_LEVEL,
  BADGES,
  CREEDS,
} from '../types';

export const STORAGE_KEY = 'chavan_v2';

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function defaultRecord(date: string): DailyRecord {
  return {
    date,
    pillars: { body: false, mind: false, work: false, bonds: false },
    xpEarned: 0,
    isWin: false,
  };
}

export function defaultData(): AppData {
  return {
    version: 2,
    records: {},
    totalXp: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalWins: 0,
    totalPillarsHit: 0,
    badgesUnlocked: [],
    activeCreedLevel: 1,
    startedAt: new Date().toISOString(),
  };
}

export function loadData(): AppData {
  if (typeof window === 'undefined') return defaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 2) return defaultData();
    return parsed;
  } catch {
    return defaultData();
  }
}

export function saveData(data: AppData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Wipe v1 data on first v2 load
export function wipeLegacy(): void {
  if (typeof window === 'undefined') return;
  // Old v1 keys — remove them
  ['chavan_data', 'chavan-data', 'app_data'].forEach(k => localStorage.removeItem(k));
}

// === XP + Level ===

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpInCurrentLevel(xp: number): number {
  return xp % XP_PER_LEVEL;
}

export function xpToNextLevel(xp: number): number {
  return XP_PER_LEVEL - xpInCurrentLevel(xp);
}

export function levelProgress(xp: number): number {
  return xpInCurrentLevel(xp) / XP_PER_LEVEL;
}

// === Day calculations ===

export function pillarsCompleted(record: DailyRecord): number {
  return Object.values(record.pillars).filter(Boolean).length;
}

export function calcDayXp(record: DailyRecord): number {
  const completed = pillarsCompleted(record);
  let xp = completed * XP_PER_PILLAR;
  if (completed >= 3) xp += XP_DAY_COMPLETE_BONUS;
  return xp;
}

export function isWinDay(record: DailyRecord): boolean {
  return pillarsCompleted(record) >= 3;
}

// === Streak ===

export function calculateStreak(records: Record<string, DailyRecord>): number {
  let streak = 0;
  const today = new Date();
  const todayStr = dateKey(today);

  // Start from today; if today not won yet, start from yesterday
  const startDate = new Date(today);
  if (!records[todayStr] || !isWinDay(records[todayStr])) {
    startDate.setDate(startDate.getDate() - 1);
  }

  const cursor = new Date(startDate);
  while (true) {
    const key = dateKey(cursor);
    const rec = records[key];
    if (rec && isWinDay(rec)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// === Toggle pillar — main action ===

export function togglePillar(data: AppData, pillarId: PillarId): { data: AppData; events: GameEvent[] } {
  const today = todayKey();
  const events: GameEvent[] = [];
  const records = { ...data.records };
  const todayRec = { ...(records[today] || defaultRecord(today)) };
  todayRec.pillars = { ...todayRec.pillars, [pillarId]: !todayRec.pillars[pillarId] };

  const wasWin = todayRec.isWin;
  const newCompleted = pillarsCompleted(todayRec);
  const isNowWin = newCompleted >= 3;
  todayRec.isWin = isNowWin;

  // Recompute XP for today (replace, don't add)
  const oldDayXp = todayRec.xpEarned;
  const newDayXp = calcDayXp(todayRec);
  todayRec.xpEarned = newDayXp;

  records[today] = todayRec;

  // Update aggregates
  const xpDelta = newDayXp - oldDayXp;
  const newTotalXp = Math.max(0, data.totalXp + xpDelta);
  const oldLevel = levelFromXp(data.totalXp);
  const newLevel = levelFromXp(newTotalXp);

  const winsDelta = (isNowWin ? 1 : 0) - (wasWin ? 1 : 0);
  const newTotalWins = Math.max(0, data.totalWins + winsDelta);

  // Recount total pillars hit across all records
  const newTotalPillars = Object.values(records).reduce((sum, r) => sum + pillarsCompleted(r), 0);

  const newStreak = calculateStreak(records);
  const newBestStreak = Math.max(data.bestStreak, newStreak);

  // Determine active creed
  let newCreedLevel = data.activeCreedLevel;
  for (const creed of CREEDS) {
    if (creed.level <= newLevel) newCreedLevel = creed.level;
  }

  // Badge unlocks
  const newBadges = [...data.badgesUnlocked];
  function unlock(id: string) {
    if (!newBadges.includes(id)) {
      newBadges.push(id);
      events.push({ type: 'badge', badgeId: id });
    }
  }
  if (newTotalWins >= 1) unlock('first_flame');
  if (newStreak >= 7) unlock('streak_7');
  if (newCompleted === 4) unlock('four_pillar');
  if (Object.keys(records).length >= 30) unlock('first_month');
  if (newStreak >= 30) unlock('streak_30');
  if (newTotalWins >= 100) unlock('wins_100');
  if (newLevel >= 10) unlock('level_10');
  if (newStreak >= 100) unlock('streak_100');

  // Day-complete event (crossing the 3-pillar threshold)
  if (!wasWin && isNowWin) {
    events.push({ type: 'day_complete', xp: newDayXp, streak: newStreak });
  }

  // Level-up event
  if (newLevel > oldLevel) {
    events.push({ type: 'level_up', level: newLevel });
  }

  return {
    data: {
      ...data,
      records,
      totalXp: newTotalXp,
      currentStreak: newStreak,
      bestStreak: newBestStreak,
      totalWins: newTotalWins,
      totalPillarsHit: newTotalPillars,
      badgesUnlocked: newBadges,
      activeCreedLevel: newCreedLevel,
    },
    events,
  };
}

export type GameEvent =
  | { type: 'day_complete'; xp: number; streak: number }
  | { type: 'level_up'; level: number }
  | { type: 'badge'; badgeId: string };

// === Helpers for UI ===

export function getLast7Days(records: Record<string, DailyRecord>): { date: Date; record?: DailyRecord }[] {
  const days: { date: Date; record?: DailyRecord }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ date: d, record: records[dateKey(d)] });
  }
  return days;
}

export function dayMessage(completed: number): string {
  if (completed === 4) return 'Maximum win. Every pillar struck.';
  if (completed === 3) return 'Day won. Anything beyond is bonus.';
  if (completed === 2) return 'One more pillar away from a winning day.';
  if (completed === 1) return 'A start. Two more for the win.';
  return 'The day is yours to claim.';
}

export function activeCreedText(level: number): string {
  let text = CREEDS[0].text;
  for (const c of CREEDS) {
    if (c.level <= level) text = c.text;
  }
  return text;
}

export function formatHeaderDate(d: Date): string {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return `${days[d.getDay()]} · ${months[d.getMonth()]} ${d.getDate()}`;
}
