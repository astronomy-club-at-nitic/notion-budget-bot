// Refer: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as dotenv from 'dotenv';

import { z, parseEnv } from 'znv';

dotenv.config(); // Loads .env file

export const { DISCORD_BOT_TOKEN } = parseEnv(process.env, {
  DISCORD_BOT_TOKEN: z.string().min(1),
});
