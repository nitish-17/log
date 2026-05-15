import { useState } from 'react';
import { Header } from './components/Header';
import { FAB } from './components/FAB';
import { BottomSheet } from './components/BottomSheet';
import { Timeline } from './components/Timeline';
import { useEntries } from './hooks/useEntries';
import { entriesService } from './db/service';
import { seedMockData } from './utils/mockData';
import { type LogEntry, type EntryType } from './db/db';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);

  const entries = useEntries(currentDate);

  const handleAddEntry = async (content: string, category: EntryType) => {
    if (editingEntry?.id) {
      await entriesService.updateEntry(editingEntry.id, content, category);
    } else {
      const timestamp = new Date(currentDate);
      const now = new Date();
      timestamp.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      await entriesService.addEntry(content, category, timestamp);
    }
    setEditingEntry(null);
  };

  const handleLongPress = (entry: LogEntry) => {
    setEditingEntry(entry);
    setIsSheetOpen(true);
  };

  const handleDelete = async () => {
    if (editingEntry?.id) {
      await entriesService.deleteEntry(editingEntry.id);
      setIsSheetOpen(false);
      setEditingEntry(null);
    }
  };

  return (
    <>
      <Header currentDate={currentDate} onDateChange={setCurrentDate} />
      
      <main className="timeline-container">
        <Timeline 
          entries={entries || []} 
          onLongPress={handleLongPress} 
        />
        
        {entries?.length === 0 && (
          <button 
            className="seed-button"
            onClick={() => seedMockData()}
          >
            Seed Mock Data
          </button>
        )}
      </main>

      <FAB onClick={() => {
        setEditingEntry(null);
        setIsSheetOpen(true);
      }} />

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setEditingEntry(null);
        }}
        onSubmit={handleAddEntry}
        onDelete={handleDelete}
        initialContent={editingEntry?.content}
        initialCategory={editingEntry?.category}
        isEditing={!!editingEntry}
      />

      <style>{`
        .timeline-container {
          flex: 1;
          padding: 1rem;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }

        .seed-button {
          display: block;
          margin: 2rem auto;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-family);
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

export default App;
