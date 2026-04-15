'use client';

import { Task, PILLARS, PILLAR_EXAMPLES } from '../types';

interface DailyTrackerProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export function DailyTracker({ tasks, onToggleTask }: DailyTrackerProps) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const isSuccessful = completedCount >= 3;

  return (
    <div className="space-y-6">
      {/* Today's Date */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {tasks.map((task) => {
          const pillar = PILLARS.find((p) => p.id === task.id);
          const examples = PILLAR_EXAMPLES[task.id];

          return (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                task.completed
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                  : 'border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white hover:border-black dark:hover:border-white'
              }`}
            >
              <div className="text-3xl mb-2">{pillar?.emoji}</div>
              <h3 className="font-bold text-sm mb-2">{pillar?.name}</h3>

              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-bold ${
                  task.completed
                    ? 'bg-black dark:bg-white border-black dark:border-white'
                    : 'border-gray-400 dark:border-gray-600'
                }`}
              >
                {task.completed && '✓'}
              </div>

              {/* Examples hint */}
              <p className="text-xs mt-3 opacity-60">
                {examples?.[0]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Success Status */}
      <div className="text-center py-4">
        <div className="text-4xl font-bold mb-2">
          {isSuccessful ? '✓' : '✗'}
        </div>
        <p className="text-lg font-semibold">
          {isSuccessful ? 'Successful Day' : 'Missed Day'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {completedCount} of 4 tasks completed
          {!isSuccessful && ` (need 3 of 4)`}
        </p>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-300 dark:border-gray-700">
        <p className="italic text-sm">
          "You're just a man. Improve today."
        </p>
      </div>
    </div>
  );
}
