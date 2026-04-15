export interface Task {
  id: 'body' | 'mind' | 'work' | 'relationships';
  name: string;
  completed: boolean;
  completedAt?: string;
}

export interface DailyRecord {
  date: string;
  tasks: Task[];
  isSuccessful: boolean;
}

export interface AppData {
  records: DailyRecord[];
  currentStreak: number;
  totalSuccessfulDays: number;
}

export const PILLARS = [
  { id: 'body' as const, name: 'Body', emoji: '💪' },
  { id: 'mind' as const, name: 'Mind', emoji: '🧠' },
  { id: 'work' as const, name: 'Work', emoji: '⚙️' },
  { id: 'relationships' as const, name: 'Relationships', emoji: '🤝' },
];

export const PILLAR_EXAMPLES: Record<string, string[]> = {
  body: ['Workout', 'Steps/Walk', 'Physical activity'],
  mind: ['Reading', 'Learning', 'Studying/Skills'],
  work: ['Build something', 'Deep work', 'Progress toward goals'],
  relationships: ['Meaningful conversation', 'Networking', 'Family time'],
};
