import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface EntryInputBarProps {
  onSubmit: (content: string) => void;
}

export const EntryInputBar: React.FC<EntryInputBarProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      // 1 line is ~37px, 2 lines is ~58px, 3 lines is ~79px with 8px padding
      textarea.style.height = `${Math.min(scrollHeight, 81)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '24px';
      }
    }
  };

  return (
    <div className="entry-input-bar-container">
      <form onSubmit={handleSubmit} className="entry-input-bar">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`bar-input ${content ? 'has-content' : ''}`}
          rows={1}
        />
        <button type="submit" className="add-button" disabled={!content.trim()}>
          <Plus size={24} />
        </button>
      </form>

      <style>{`
        .entry-input-bar-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem 1rem;
          padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
          z-index: 100;
          background-color: transparent
        }

        .entry-input-bar {
          display: flex;
          align-items: flex-end;
          gap: 0.75rem;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }

        .bar-input {
          flex: 1;
          background-color: transparent;
          border-color:transparent;
          border-radius: 12px;
          color: var(--text-primary);
          font-family: var(--font-family);
          font-size: 0.95rem;
          padding: 8px 12px;
          resize: none;
          outline: none;
          max-height: 81px; /* ~3 lines + padding */
          line-height: 1.4;
          transition: all 0.2s;
        }

        .bar-input.has-content {
          background-color: var(--bg-color);
        }

        .bar-input:focus {
          border-color: var(--color-note);
        }

        .add-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          margin-bottom: 4px;
          color:  var(--color-note);
          background-color: var(--bg-color);
          }

        .add-button svg {
          width: 18px;
          height: 18px;
        }

        .add-button:disabled {
          opacity: 1;
          cursor: not-allowed;
          color:  transparent;
          background-color: transparent;
        }

        .add-button:active:not(:disabled) {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};
