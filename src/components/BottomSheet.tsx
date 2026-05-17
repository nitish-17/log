import React, { useState, useEffect, useRef } from 'react';
import { Trash2, X, Check } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  onDelete?: () => void;
  initialContent?: string;
  isEditing?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialContent = '',
  isEditing = false,
}) => {
  const [content, setContent] = useState(initialContent);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setContent(initialContent);
    }
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      if ('vibrate' in navigator) {
        navigator.vibrate([10, 30, 10]);
      }
      onSubmit(content.trim());
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

          <div className="action-bar">
            <div className="delete-container">
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

            <button type="button" className="action-btn void-btn" onClick={onClose} aria-label="Cancel">
              <X size={24} />
            </button>

            <div className="enter-container">
              <button type="submit" className="action-btn enter-btn" disabled={!content.trim()} aria-label="Commit">
                <Check size={24} />
              </button>
            </div>
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
          white-space: pre-wrap;
        }

        .action-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
        }

        .delete-container {
          display: flex;
          justify-content: flex-start;
        }

        .enter-container {
          display: flex;
          justify-content: flex-end;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          font-family: var(--font-family);
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .void-btn {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
        }

        .void-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .delete-btn {
          background-color: rgba(255, 68, 68, 0.1);
          color: #ff4444;
        }

        .delete-btn:hover {
          background-color: rgba(255, 68, 68, 0.2);
        }

        .enter-btn {
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--accent-blue);
        }

        .enter-btn:not(:disabled):hover {
          background-color: rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};
