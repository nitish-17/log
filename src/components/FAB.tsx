import React from 'react';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

export const FAB: React.FC<FABProps> = ({ onClick }) => {
  const handleClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  };

  return (
    <button className="fab" onClick={handleClick} aria-label="Create new entry">
      <Plus size={28} />
      <style>{`
        .fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--accent-blue);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s, background-color 0.2s, border-color 0.2s;
          z-index: 100;
        }

        .fab:hover {
          transform: scale(1.05);
          background-color: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .fab:active {
          transform: scale(0.95);
        }
      `}</style>
    </button>
  );
};
