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
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-2 gap-3">
        {tasks.map((task) => {
          const pillar = PILLARS.find((p) => p.id === task.id);
          const examples = PILLAR_EXAMPLES[task.id];

          return (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-5 rounded-xl border transition-all duration-200 text-left group ${
                task.completed
                  ? 'border-gray-800 bg-gray-900 text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-900 hover:border-gray-400 hover:bg-white'
              }`}
            >
              <div className={`text-2xl mb-3 ${task.completed ? 'opacity-100' : 'opacity-80'}`}>
                {pillar?.emoji}
              </div>
              <h3 className="font-semibold text-sm leading-tight mb-3">
                {pillar?.name}
              </h3>

              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${
                  task.completed
                    ? 'bg-white border-white'
                    : 'border-gray-300 bg-transparent group-hover:border-gray-400'
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
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-center">
        <div className="text-5xl font-light mb-4">
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
