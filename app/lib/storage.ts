import { AppData, DailyRecord, Task, PILLARS } from '../types';

const STORAGE_KEY = 'chavan_app_data';

export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getYesterdayDate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export function createEmptyTasks(): Task[] {
  return PILLARS.map((pillar) => ({
    id: pillar.id,
    name: pillar.name,
    completed: false,
  }));
}

export function createEmptyRecord(date: string): DailyRecord {
  return {
    date,
    tasks: createEmptyTasks(),
    isSuccessful: false,
  };
}

export function getDefaultAppData(): AppData {
  return {
    records: [],
    currentStreak: 0,
    totalSuccessfulDays: 0,
  };
}

export function getTodayRecord(data: AppData): DailyRecord {
  const today = getTodayDate();
  let record = data.records.find((r) => r.date === today);

  if (!record) {
    record = createEmptyRecord(today);
    data.records.push(record);
  }

  return record;
}

export function calculateDaySuccess(tasks: Task[]): boolean {
  const completedCount = tasks.filter((t) => t.completed).length;
  return completedCount >= 3;
}

export function calculateStreak(records: DailyRecord[]): number {
  if (records.length === 0) return 0;

  let streak = 0;
  const sorted = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = getTodayDate();
  const yesterday = getYesterdayDate();

  for (let i = 0; i < sorted.length; i++) {
    const record = sorted[i];

    // Calculate expected date for this position
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];

    if (record.date !== expectedDateStr) {
      break;
    }

    if (record.isSuccessful) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function calculateTotalSuccessfulDays(records: DailyRecord[]): number {
  return records.filter((r) => r.isSuccessful).length;
}
