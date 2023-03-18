import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';

@Discord()
export class Example {
  @On()
  messageDelete([message]: ArgsOf<'messageDelete'>, client: Client): void {
    // eslint-disable-next-line no-console
    console.log('Message Deleted', client.user?.username, message.content);
  }
}
