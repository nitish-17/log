import React from 'react';

interface DurationDisplayProps {
  seconds: number;
}

export const DurationDisplay: React.FC<DurationDisplayProps> = ({ seconds }) => {
  if (seconds <= 0) return null;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0) parts.push(`${s}s`);

  const text = parts.join(' ');

  return (
    <div className="duration-display">
      <span className="duration-text">{text}</span>
      <style>{`
        .duration-display {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem 0;
          height: 24px;
          position: relative;
          width: 100%;
        }

        .duration-text {
          font-size: 0.85rem;
          color: #777777;
          background-color: var(--bg-color);
          padding: 0 0.75rem;
          z-index: 2;
          font-weight: 700;
          letter-spacing: 0.05em;
          white-space: nowrap;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};
