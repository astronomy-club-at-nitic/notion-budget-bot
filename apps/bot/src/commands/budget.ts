import type { CommandInteraction } from 'discord.js';
import { ApplicationCommandOptionType, codeBlock, time, bold, inlineCode } from 'discord.js';
import { Discord, Guild, Slash, SlashGroup, SlashOption } from 'discordx';
import { NODE_ENV, DISCORD_GUILD_ID, NOTION_DATABASE_ID, DISCORD_BOT_TOKEN, NOTION_SECRET } from '../env.js';
import { retriveDatabaseMetadata } from '../infra/notion.js';
import { coverSecretString } from '../utils/coverSecretString.js';

@Discord()
@SlashGroup({ description: 'Notionで管理されている予算を確認しましょう！', name: 'budget' })
@Guild(DISCORD_GUILD_ID as string[])
export class BudgetCommandGroup {
  @Slash({ description: '現在のボットの情報を表示します。' })
  @SlashGroup('budget')
  async status(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply({
      ephemeral: true,
    });
    try {
      const botInfo = {
        NODE_ENV,
        DISCORD_GUILD_ID,
        NOTION_DATABASE_ID,
        DISCORD_BOT_TOKEN: coverSecretString(DISCORD_BOT_TOKEN),
        NOTION_SECRET: coverSecretString(NOTION_SECRET),
      };
      const { properties: notionDatabaseProperties, ...notionDatabaseInfo } = await retriveDatabaseMetadata();

      await interaction.editReply({
        content: `${bold(time(new Date()))} 時点でのボットの稼働情報を表示します。`,
      });

      // 環境変数を表示する
      await interaction.followUp({
        content: `${bold('♻️ 環境変数')} ${codeBlock('json', JSON.stringify(botInfo, null, 2))}`,
        ephemeral: true,
      });

      // Notionのデータベースの情報を表示する
      await interaction.followUp({
        content: `${bold('💽 Notionデータベース')} ${inlineCode('properties')}以外を表示しています。 ${codeBlock(
          'json',
          // 最初の1900文字のみ
          JSON.stringify(notionDatabaseInfo, null, 2).slice(0, 1900),
        )}`,
        ephemeral: true,
      });

      // Notionのデータベースのプロパティーを表示する
      Object.entries(notionDatabaseProperties).forEach(([key, value]) => {
        interaction.followUp({
          content: `${bold('💽 Notionデータベース')} ${inlineCode(key)}のプロパティーを表示しています。 ${codeBlock(
            'json',
            JSON.stringify(value, null, 2),
          )}`,
          ephemeral: true,
        });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error instanceof Error) {
        await interaction.followUp({
          content: `${bold('🚨 例外が発生しました。')} ${inlineCode(error.name)} ${codeBlock('js', `${error.stack}`)}`,
          ephemeral: true,
        });
      }
    }
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
