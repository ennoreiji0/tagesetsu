import { openDB } from 'idb';

type Message = {
  id?: number;
  userName: string;
  text: string;
  timestamp: number;
};

const dbPromise = typeof window !== 'undefined' 
  ? openDB('tagesetsu-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('messages')) {
          db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
        }
      },
    })
  : null; // サーバーサイドでは何もしない

export const saveMessage = async (userName: string, text: string) => {
  if (!dbPromise) return;
  const db = await dbPromise;

  await db.add('messages', {
    userName: userName, // お前が言ってた「毎回名前出す」作戦
    text: text,
    timestamp: Date.now(),
  });
};

export const getAllMessages = async () => {
  if (!dbPromise) return;
  const db = await dbPromise;
  return await db.getAll('messages') as Message[];
};