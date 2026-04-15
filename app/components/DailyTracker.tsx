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
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-2 gap-4">
        {tasks.map((task) => {
          const pillar = PILLARS.find((p) => p.id === task.id);
          const examples = PILLAR_EXAMPLES[task.id];

          return (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                task.completed
                  ? 'border-black bg-black text-white'
                  : 'border-gray-400 bg-white text-black hover:border-black'
              }`}
            >
              <div className="text-3xl mb-2">{pillar?.emoji}</div>
              <h3 className="font-bold text-sm mb-3">{pillar?.name}</h3>

              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs font-bold ${
                  task.completed
                    ? 'bg-white border-white text-black'
                    : 'border-gray-400 bg-transparent'
                }`}
              >
                {task.completed && '✓'}
              </div>

              {/* Examples hint */}
              <p className="text-xs mt-3 opacity-70">
                {examples?.[0]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Success Status */}
      <div className="text-center py-6 bg-white border-2 border-gray-300 rounded-lg">
        <div className="text-5xl font-bold mb-2">
          {isSuccessful ? '✓' : '✗'}
        </div>
        <p className="text-xl font-semibold text-black">
          {isSuccessful ? 'Successful Day' : 'Missed Day'}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {completedCount} of 4 tasks completed
          {!isSuccessful && ` (need 3 of 4)`}
        </p>
      </div>

      {/* Motivational Quote */}
      <div className="bg-white rounded-lg p-4 text-center border-2 border-gray-300">
        <p className="italic text-sm text-black">
          "You're just a man. Improve today."
        </p>
      </div>
    </div>
  );
}
