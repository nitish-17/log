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

export function usePreviousDayLastEntry(date: Date) {
  return useLiveQuery(async () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    
    const startOfPrevDay = new Date(prevDate);
    startOfPrevDay.setHours(0, 0, 0, 0);
    const endOfPrevDay = new Date(prevDate);
    endOfPrevDay.setHours(23, 59, 59, 999);

    const prevEntries = await db.entries
      .where('timestamp')
      .between(startOfPrevDay, endOfPrevDay)
      .reverse()
      .toArray();
    
    return prevEntries.length > 0 ? prevEntries[0] : null;
  }, [date.toDateString()]);
}
