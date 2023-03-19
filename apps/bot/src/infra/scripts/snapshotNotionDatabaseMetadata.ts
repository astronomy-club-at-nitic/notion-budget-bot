/* eslint-disable no-console */
import { writeFile } from 'fs/promises';
import { retriveDatabaseMetadata } from '../notion.js';

// scriptとして実行された場合にのみ実行される ESMの仕様
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const metadata = await retriveDatabaseMetadata();
    // 型推論に利用するために、可読性のあるJSONとして保存する
    const json = JSON.stringify(metadata, null, 2);
    await writeFile('./src/infra/databaseMetadata.json', json);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
