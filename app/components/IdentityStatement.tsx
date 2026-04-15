'use client';

export function IdentityStatement() {
  return (
    <div className="fade-up fade-up-5" style={{
      padding: '28px 24px',
      borderRadius: '14px',
      background: 'var(--surface)',
      border: '1px solid var(--surface-high)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,129,58,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p className="font-serif" style={{
        fontSize: '22px',
        color: 'var(--amber)',
        marginBottom: '16px',
        fontStyle: 'italic',
        lineHeight: 1.3,
      }}>
        "Be the person<br/>who shows up."
      </p>

      <div style={{ width: '24px', height: '1px', background: 'var(--surface-high)', margin: '0 auto 16px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {['Body. Mind. Work. Bonds.'].map((line, i) => (
          <p key={i} style={{
            fontSize: '12px',
            color: 'var(--warm-mid)',
            fontWeight: 300,
            letterSpacing: '0.08em',
          }}>
            {line}
          </p>
        ))}
      </div>

      <p style={{
        marginTop: '16px',
        fontSize: '10px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--surface-high)',
        fontWeight: 600,
      }}>
        Repeat daily
      </p>
    </div>
  );
}
