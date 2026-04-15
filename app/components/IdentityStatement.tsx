'use client';

export function IdentityStatement() {
  return (
    <div className="bg-gray-900 rounded-xl p-8 space-y-4 text-center">
      <p className="text-white text-sm font-light leading-relaxed">
        <span className="font-semibold">Chavan</span> — a framework for self-improvement
      </p>
      <div className="w-1 h-1 bg-gray-700 mx-auto"></div>
      <div className="space-y-3 text-gray-300 text-xs font-light">
        <p>Strengthen your body.</p>
        <p>Expand your mind.</p>
        <p>Build meaningful work.</p>
        <p>Deepen your relationships.</p>
      </div>
      <div className="w-1 h-1 bg-gray-700 mx-auto"></div>
      <p className="text-white text-xs font-medium tracking-wide uppercase">
        Repeat daily.
      </p>
    </div>
  );
}
