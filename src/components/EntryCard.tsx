import React, { useRef } from 'react';
import { FileText, CheckSquare, Calendar } from 'lucide-react';
import { type LogEntry, type EntryType } from '../db/db';

interface EntryCardProps {
  entry: LogEntry;
  onLongPress: (entry: LogEntry) => void;
}

const CategoryIcon = ({ type, size = 16 }: { type: EntryType; size?: number }) => {
  switch (type) {
    case 'Note':
      return <FileText size={size} color="var(--color-note)" />;
    case 'Task':
      return <CheckSquare size={size} color="var(--color-task)" />;
    case 'Event':
      return <Calendar size={size} color="var(--color-event)" />;
    default:
      return null;
  }
};

export const EntryCard: React.FC<EntryCardProps> = ({ entry, onLongPress }) => {
  const timerRef = useRef<number | null>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
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
      onTouchEnd={handleEnd}
    >
      <div className="entry-meta">
        <span className="timestamp">{formatTime(new Date(entry.timestamp))}</span>
        <div className="category-icon-wrapper">
          <CategoryIcon type={entry.category} />
        </div>
      </div>
      
      <div className="entry-content-card">
        {entry.content}
      </div>

      <style>{`
        .entry-card-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          gap: 0.5rem;
          min-width: 75px;
        }

        .timestamp {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
          min-width: 45px;
          background-color: var(--bg-color);
          padding: 0.25rem 0;
          z-index: 2;
          text-align: center;
        }

        .category-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
        }

        .entry-content-card {
          flex: 1;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          line-height: 1.4;
          color: var(--text-primary);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .note .entry-content-card {
          border-color: rgba(77, 170, 252, 0.2);
          box-shadow: 0 0 10px rgba(77, 170, 252, 0.05);
        }

        .task .entry-content-card {
          border-color: rgba(63, 185, 80, 0.2);
        }

        .event .entry-content-card {
          border-color: rgba(188, 140, 255, 0.2);
        }

        .entry-card-container:active .entry-content-card {
          border-color: var(--accent-blue);
        }
      `}</style>
    </div>
  );
};
