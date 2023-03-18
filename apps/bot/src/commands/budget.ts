import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandOptionType } from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import { NODE_ENV, DISCORD_GUILD_ID, NOTION_DATABASE_ID, DISCORD_BOT_TOKEN, NOTION_SECRET } from '../env.js';
import { coverSecretString } from '../utils/coverSecretString.js';

@Discord()
@SlashGroup({ description: 'Notionで管理されている予算を確認しましょう！', name: 'budget' })
export class GroupExample {
  @Slash({ description: '現在のボットの情報を表示します。' })
  @SlashGroup('budget')
  status(interaction: CommandInteraction): void {
    const botInfo = {
      NODE_ENV,
      DISCORD_GUILD_ID,
      NOTION_DATABASE_ID,
      DISCORD_BOT_TOKEN: coverSecretString(DISCORD_BOT_TOKEN),
      NOTION_SECRET: coverSecretString(NOTION_SECRET),
    };
    interaction.reply(
      `${new Date().toLocaleString()} 時点でのボットの稼働情報を表示します:\n` +
        `\`\`\`json\n${JSON.stringify(botInfo, null, 2)}\`\`\``,
    );
  }

  @Slash({ description: 'Notionで管理されている予算の現在の概要を表示します。' })
  @SlashGroup('budget')
  list(
    @SlashOption({
      description: 'text',
      name: 'text',
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    text: string,
    interaction: CommandInteraction,
  ): void {
    interaction.reply(text);
  }
}
