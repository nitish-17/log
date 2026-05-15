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
          background-color: rgba(255, 255, 255, 0.005);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          color: var(--accent-blue);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, background-color 0.2s;
          z-index: 100;
          opacity: 0.6;
        }

        .fab:hover {
          transform: scale(1.05);
          background-color: rgba(255, 255, 255, 0.03);
          opacity: 1;
        }

        .fab:active {
          transform: scale(0.95);
        }
      `}</style>
    </button>
  );
};
