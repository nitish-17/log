import { useState } from 'react';
import { Header } from './components/Header';
import { EntryInputBar } from './components/EntryInputBar';
import { BottomSheet } from './components/BottomSheet';
import { Timeline } from './components/Timeline';
import { useEntries, usePreviousDayLastEntry } from './hooks/useEntries';
import { entriesService } from './db/service';
import { type LogEntry } from './db/db';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);

  const entries = useEntries(currentDate);
  const previousDayLastEntry = usePreviousDayLastEntry(currentDate);

  const handleAddEntry = async (content: string) => {
    const now = new Date();
    await entriesService.addEntry(content, 'Note', now);
    // Auto-navigate to today to see the new entry
    setCurrentDate(new Date());
  };

  const handleUpdateEntry = async (content: string) => {
    if (editingEntry?.id) {
      await entriesService.updateEntry(editingEntry.id, content, 'Note');
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
          previousDayLastEntry={previousDayLastEntry}
        />
      </main>

      <EntryInputBar onSubmit={handleAddEntry} />

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setEditingEntry(null);
        }}
        onSubmit={handleUpdateEntry}
        onDelete={handleDelete}
        initialContent={editingEntry?.content}
        isEditing={!!editingEntry}
      />

      <style>{`
        .timeline-container {
          flex: 1;
          padding: 1rem 1rem 80px 0.6rem; /* Extra bottom padding for input bar */
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default App;
