import React, { useState, useEffect, useRef } from 'react';
import { Trash2, X, Check } from 'lucide-react';
import { type EntryType } from '../db/db';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, category: EntryType) => void;
  onDelete?: () => void;
  initialContent?: string;
  initialCategory?: EntryType;
  isEditing?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialContent = '',
  initialCategory = 'Note',
  isEditing = false,
}) => {
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState<EntryType>(initialCategory);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
      setCategory(initialCategory);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, initialContent, initialCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      if ('vibrate' in navigator) {
        navigator.vibrate([10, 30, 10]);
      }
      onSubmit(content.trim(), category);
      onClose();
    }
  };

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="bottom-sheet-header">
          <div className="drag-handle" />
        </div>

        <form onSubmit={handleSubmit} className="bottom-sheet-content">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="entry-input"
          />

          <div className="category-selector">
            {(['Note', 'Task', 'Event'] as EntryType[]).map((type) => (
              <label key={type} className={`category-option ${category === type ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="category"
                  value={type}
                  checked={category === type}
                  onChange={() => setCategory(type)}
                />
                <span className="category-dot" style={{ backgroundColor: `var(--color-${type.toLowerCase()})` }} />
                {type}
              </label>
            ))}
          </div>

          <div className="action-bar">
            <div className="left-actions">
              <button type="button" className="action-btn void-btn" onClick={onClose} aria-label="Cancel">
                <X size={24} />
              </button>
              {isEditing && onDelete && (
                <button type="button" className="action-btn delete-btn" onClick={() => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate(100);
                  }
                  onDelete();
                }} aria-label="Delete">
                  <Trash2 size={24} />
                </button>
              )}
            </div>
            <button type="submit" className="action-btn enter-btn" disabled={!content.trim()}>
              <Check size={20} /> Enter
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .bottom-sheet-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: flex-end;
          z-index: 200;
          backdrop-filter: blur(2px);
        }

        .bottom-sheet {
          width: 100%;
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          padding-bottom: env(safe-area-inset-bottom, 1rem);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .bottom-sheet-header {
          display: flex;
          justify-content: center;
          padding: 0.75rem;
        }

        .drag-handle {
          width: 40px;
          height: 4px;
          background-color: var(--border-color);
          border-radius: 2px;
        }

        .bottom-sheet-content {
          padding: 0 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .entry-input {
          width: 100%;
          min-height: 120px;
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-family);
          font-size: 1rem;
          resize: none;
          outline: none;
        }

        .category-selector {
          display: flex;
          gap: 0.75rem;
        }

        .category-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-secondary);
        }

        .category-option.active {
          border-color: var(--text-primary);
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .category-option input {
          display: none;
        }

        .category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .left-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          border: none;
          font-family: var(--font-family);
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .void-btn {
          background-color: transparent;
          color: var(--text-secondary);
          padding: 0.5rem;
        }

        .delete-btn {
          background-color: rgba(255, 68, 68, 0.1);
          color: #ff4444;
          padding: 0.5rem;
        }

        .enter-btn {
          background-color: var(--accent-blue);
          color: white;
        }

        .enter-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
