import { entriesService } from '../db/service';

export async function seedMockData() {
  const now = new Date();
  
  const mocks = [
    {
      content: 'Finished the design system documentation',
      category: 'Task',
      offset: -120, // 2 hours ago
    },
    {
      content: 'Brainstorming session for the new logo',
      category: 'Event',
      offset: -65, // 1 hour 5 mins ago
    },
    {
      content: 'Remember to check the PWA manifest requirements',
      category: 'Note',
      offset: -60, // 1 hour ago
    },
    {
      content: 'Quick coffee break',
      category: 'Note',
      offset: -10, // 10 mins ago
    },
    {
      content: 'Update the Dexie schema for the new entries',
      category: 'Task',
      offset: -2, // 2 mins ago
    }
  ];

  for (const mock of mocks) {
    const timestamp = new Date(now.getTime() + mock.offset * 60000);
    await entriesService.addEntry(mock.content, mock.category as any, timestamp);
  }
  
  console.log('Mock data seeded successfully');
}
