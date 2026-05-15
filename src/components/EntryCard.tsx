import React, { useRef } from 'react';
import { type LogEntry } from '../db/db';

interface EntryCardProps {
  entry: LogEntry;
  onLongPress: (entry: LogEntry) => void;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry, onLongPress }) => {
  const timerRef = useRef<number | null>(null);

  const formatTime = (date: Date) => {
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return timeStr.toLowerCase();
  };

  const handleStart = () => {
    timerRef.current = window.setTimeout(() => {
      onLongPress(entry);
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      timerRef.current = null;
    }, 500);
  };

  const handleMove = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div
      className={`entry-card-container ${entry.category.toLowerCase()}`}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="entry-meta">
        <span className="timestamp">{formatTime(new Date(entry.timestamp))}</span>
      </div>

      <div className="entry-content-card">
        {entry.content}
      </div>

      <style>{`
        .entry-card-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.25rem 0;
          position: relative;
          user-select: none;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .entry-card-container:active {
          transform: scale(0.99);
        }

        .entry-meta {
          display: flex;
          align-items: center;
          min-width: 80px;
        }

        .timestamp {
          font-size: 0.85rem;
          font-weight: 500;
          min-width: 80px;
          background-color: var(--bg-color);
          padding: 0.25rem 0;
          z-index: 2;
          text-align: center;
        }

        .note .timestamp { color: var(--color-note); }
        .task .timestamp { color: var(--color-task); }
        .event .timestamp { color: var(--color-event); }

        .entry-content-card {
          flex: 1;
          padding: 1rem 0 1rem 0;
          font-size: 0.95rem;
          line-height: 1.4;
          color: var(--text-primary);
        }

        .entry-card-container:active .entry-content-card {
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(1px);
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};
