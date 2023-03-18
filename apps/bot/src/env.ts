// Refer: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv';

import { z, parseEnv } from 'znv';

dotenv.config(); // Loads .env file

export const { NODE_ENV, DISCORD_GUILD_ID, DISCORD_BOT_TOKEN, NOTION_SECRET, NOTION_DATABASE_ID } = parseEnv(
  process.env,
  {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DISCORD_BOT_TOKEN: z.string().min(1),
    NOTION_SECRET: z.string().min(1),
    NOTION_DATABASE_ID: z.string().min(1),
    DISCORD_GUILD_ID: z.array(z.string().min(1)),
  },
);
