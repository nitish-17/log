import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { entriesService } from '../db/service';

interface HeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentDate, onDateChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const tapCount = useRef(0);
  const lastTap = useRef(0);

  const handleMultiTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 250) {
      tapCount.current += 1;
    } else {
      tapCount.current = 1;
    }
    lastTap.current = now;

    if (tapCount.current === 5) {
      const confirmed = window.confirm('Purge all logs? This cannot be undone.');
      if (confirmed) {
        entriesService.purgeAllData().then(() => {
          window.location.reload();
        });
      }
      tapCount.current = 0;
    }
  };

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
    <header
      className={`header ${isExpanded ? 'expanded' : 'collapsed'}`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <button
        className="nav-btn"
        onClick={(e) => {
          e.stopPropagation();
          shiftDate(-1);
        }}
        aria-label="Previous day"
      >
        <ChevronLeft size={20} color="var(--accent-blue)" />
      </button>

      <div className="date-display" onClick={(e) => {
        if (isExpanded) {
          e.stopPropagation();
          handleMultiTap();
          
          const currentTapSession = lastTap.current;
          setTimeout(() => {
            if (lastTap.current === currentTapSession && isExpanded) {
              setIsExpanded(false);
            }
          }, 250);
        }
      }}>
        <span className="date-text">{formatDate(currentDate)}</span>
        {isExpanded && !isToday(currentDate) && (
          <button
            className="today-button"
            onClick={(e) => {
              e.stopPropagation();
              onDateChange(new Date());
              setIsExpanded(false);
            }}
          >
            Today
          </button>
        )}
      </div>

      <button
        className="nav-btn"
        onClick={(e) => {
          e.stopPropagation();
          shiftDate(1);
        }}
        aria-label="Next day"
      >
        <ChevronRight size={20} color="var(--accent-blue)" />
      </button>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: center; /* Center when collapsed */
          padding: 0.5rem 1rem;
          padding-top: calc(0.5rem + env(safe-area-inset-top));
          position: sticky;
          top: 0;
          z-index: 10;
          transition: all 0.3s ease;
          cursor: pointer;
          min-height: 40px;
        }

        .header.expanded {
          justify-content: space-between;
          background-color: var(--bg-color);
        }

        .header.collapsed {
          background: transparent;
        }

        .header.collapsed .date-display {
          opacity: 0;
        }

        .header .nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s;
          opacity: 0.8;
        }

        .header.collapsed .nav-btn {
          opacity: 0;
          pointer-events: none;
          width: 0;
          padding: 0;
          overflow: hidden;
        }

        .header .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.03);
          opacity: 1;
        }

        .date-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.3s ease;
        }

        .date-text {
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--accent-blue);
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .header.expanded .date-text {
          opacity: 1;
          font-size: 1rem;
          font-weight: 600;
        }

        .today-button {
          font-size: 0.7rem !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-blue) !important;
          padding: 2px 8px !important;
          border-radius: 4px !important;
          background: rgba(59, 130, 246, 0.1) !important;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};
