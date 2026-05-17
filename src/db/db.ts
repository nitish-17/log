import Dexie, { type Table } from 'dexie';

export type EntryType = 'Note';

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
    this.version(2).stores({
      entries: '++id, timestamp'
    }).upgrade(tx => {
      return tx.table('entries').toCollection().modify(entry => {
        entry.category = 'Note';
      });
    });
  }
}

export const db = new LogDatabase();
