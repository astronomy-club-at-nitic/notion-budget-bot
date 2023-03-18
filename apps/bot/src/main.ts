import { dirname, importx } from '@discordx/importer';
import type { Interaction, Message } from 'discord.js';
import { IntentsBitField } from 'discord.js';
import { Client } from 'discordx';
import { NODE_ENV, DISCORD_BOT_TOKEN, DISCORD_GUILD_ID } from './env.js';

// eslint-disable-next-line no-console
console.info('この環境変数でボットを実行します: ', {
  NODE_ENV,
  DISCORD_GUILD_ID,
});

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: '!',
  },

  // 通常のグローバルコマンドは、変更が伝播されるまでに時間がかかる
  // そのため、開発中は、botGuildsを指定して、そのギルドに対してのみ変更が即座に反映されるように開発中のみ有効にする
  botGuilds: NODE_ENV === 'development' ? (DISCORD_GUILD_ID as string[]) : undefined,
});

bot.once('ready', async () => {
  // Make sure all guilds are cached
  // await bot.guilds.fetch();

  // Synchronize applications commands with Discord
  await bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  // eslint-disable-next-line no-console
  console.log('Bot started');
});

bot.on('interactionCreate', (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on('messageCreate', (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  // Let's start the bot

  // Log in with your bot token
  await bot.login(DISCORD_BOT_TOKEN);
}

run();
