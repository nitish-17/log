import Dexie, { type Table } from 'dexie';

export type EntryType = 'Note' | 'Task' | 'Event';

export interface LogEntry {
  id?: number;
  content: string;
  category: EntryType;
  timestamp: Date;
}

export class LogDatabase extends Dexie {
  entries!: Table<LogEntry>;

  constructor() {
    super('LogDatabase');
    this.version(1).stores({
      entries: '++id, timestamp, category'
    });
  }
}

export const db = new LogDatabase();
