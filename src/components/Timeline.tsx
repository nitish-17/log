import React from 'react';
import { EntryCard } from './EntryCard';
import { DurationDisplay } from './DurationDisplay';
import { type LogEntry } from '../db/db';

interface TimelineProps {
  entries: LogEntry[];
  onLongPress: (entry: LogEntry) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ entries, onLongPress }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No logs for this day.</p>
      </div>
    );
  }

  return (
    <div className="timeline">
      <div className="timeline-line" />
      {entries.map((entry, index) => {
        const nextEntry = entries[index + 1];
        let durationSeconds = 0;

        if (nextEntry) {
          const diffMs = entry.timestamp.getTime() - nextEntry.timestamp.getTime();
          durationSeconds = Math.floor(diffMs / 1000);
        }

        return (
          <React.Fragment key={entry.id}>
            <div className="timeline-item">
              <EntryCard entry={entry} onLongPress={onLongPress} />
            </div>
            {nextEntry && (
              <DurationDisplay seconds={durationSeconds} />
            )}
          </React.Fragment>
        );
      })}

      <style>{`
        .timeline {
          position: relative;
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
        }

        .timeline-line {
          position: absolute;
          left: 22.5px; /* Center of the 45px wide timestamp */
          top: 2rem;
          bottom: 2rem;
          width: 0;
          border-left: 2px dotted var(--border-color);
          z-index: 0;
        }

        .timeline-item {
          position: relative;
          z-index: 1;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
