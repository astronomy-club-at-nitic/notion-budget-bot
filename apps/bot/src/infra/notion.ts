import { Client, LogLevel } from '@notionhq/client';
import { NOTION_SECRET, NODE_ENV, NOTION_DATABASE_ID } from '../env.js';

// Notionクライアントを初期化する
export const notion = new Client({
  auth: NOTION_SECRET,
  logLevel: NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.WARN,
});

export const retriveDatabaseMetadata = async () => {
  const response = await notion.databases.retrieve({
    database_id: NOTION_DATABASE_ID,
  });
  return response;
};
