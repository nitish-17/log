import { db, type EntryType } from './db';

export const entriesService = {
  async addEntry(content: string, category: EntryType, timestamp: Date = new Date()) {
    return await db.entries.add({
      content,
      category,
      timestamp,
    });
  },

  async updateEntry(id: number, content: string, category: EntryType) {
    return await db.entries.update(id, {
      content,
      category,
    });
  },

  async deleteEntry(id: number) {
    return await db.entries.delete(id);
  },

  async getAllEntries() {
    return await db.entries.orderBy('timestamp').reverse().toArray();
  },

  async getEntriesByDate(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db.entries
      .where('timestamp')
      .between(startOfDay, endOfDay)
      .reverse()
      .toArray();
  },

  async purgeAllData() {
    return await db.entries.clear();
  }
};
