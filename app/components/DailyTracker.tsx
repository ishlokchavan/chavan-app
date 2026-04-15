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
    <div className="space-y-8">
      {/* Today's Date */}
      <div className="flex justify-between items-center">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>

      {/* Task Grid - 2 columns */}
      <div className="grid grid-cols-2 gap-3">
        {tasks.map((task) => {
          const pillar = PILLARS.find((p) => p.id === task.id);

          return (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left min-h-[140px] flex flex-col justify-between ${
                task.completed
                  ? 'border-gray-800 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div className="text-2xl">{pillar?.emoji}</div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">
                    {pillar?.name}
                  </h3>
                </div>
              </div>

              {/* Checkbox at bottom */}
              <div
                className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                  task.completed
                    ? 'bg-white border-white'
                    : 'border-gray-300 bg-transparent'
                }`}
              >
                {task.completed && (
                  <svg
                    className="w-3 h-3 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Success Status */}
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
        <div className="text-4xl font-light mb-3">
          {isSuccessful ? '✓' : '✗'}
        </div>
        <p className="text-lg font-semibold text-gray-900 mb-2">
          {isSuccessful ? 'Strong Day' : 'Try Again'}
        </p>
        <p className="text-sm text-gray-600">
          {completedCount}/4 objectives completed
        </p>
      </div>
    </div>
  );
}
