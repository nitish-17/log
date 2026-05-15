import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentDate, onDateChange }) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const shiftDate = (amount: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + amount);
    onDateChange(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <header className="header">
      <button onClick={() => shiftDate(-1)} aria-label="Previous day">
        <ChevronLeft size={20} color="var(--accent-blue)" />
      </button>

      <div className="date-display">
        <span className="date-text">{formatDate(currentDate)}</span>
        {!isToday(currentDate) && (
          <button
            className="today-button"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </button>
        )}
      </div>

      <button onClick={() => shiftDate(1)} aria-label="Next day">
        <ChevronRight size={20} color="var(--accent-blue)" />
      </button>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          padding-top: calc(1rem + env(safe-area-inset-top));
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.2s;
          opacity: 0.8;
        }

        .header button:hover {
          background-color: rgba(255, 255, 255, 0.03);
          opacity: 1;
        }

        .date-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .date-text {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--accent-blue);
        }

        .today-button {
          font-size: 0.7rem !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-blue) !important;
          padding: 2px 8px !important;
          border-radius: 4px !important;
          background: rgba(59, 130, 246, 0.1) !important;
        }
      `}</style>
    </header>
  );
};
