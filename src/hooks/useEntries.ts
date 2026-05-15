import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';

export function useEntries(date?: Date) {
  return useLiveQuery(async () => {
    if (!date) {
      return await db.entries.orderBy('timestamp').reverse().toArray();
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db.entries
      .where('timestamp')
      .between(startOfDay, endOfDay)
      .reverse()
      .toArray();
  }, [date?.toDateString()]);
}
