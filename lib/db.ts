import Dexie, { type EntityTable } from 'dexie';
import { Message } from './types';
import { Persona } from './types';

// データベースの初期化
const db = new Dexie('TagesetsuDB') as Dexie & {
  personas: EntityTable<Persona, 'id'>;
  messages: EntityTable<Message, 'id'>;
};

// スキーマの定義 (インデックスを貼りたい項目を並べる)
db.version(2).stores({
  personas: '++id, name',
  messages: '++id, senderId, timestamp'
});

export { db };