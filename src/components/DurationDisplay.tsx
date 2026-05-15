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
          padding: 0.25rem 0;
          height: 24px;
          position: relative;
          margin-left: 22.5px; /* Aligned with timeline line */
          transform: translateX(-50%);
          width: fit-content;
        }

        .duration-text {
          font-size: 0.65rem;
          color: #ffb100; /* Amber */
          background-color: var(--bg-color);
          padding: 0 0.5rem;
          z-index: 2;
          font-weight: 600;
          letter-spacing: 0.05em;
          white-space: nowrap;
          text-shadow: 0 0 8px rgba(255, 177, 0, 0.4);
        }
      `}</style>
    </div>
  );
};
