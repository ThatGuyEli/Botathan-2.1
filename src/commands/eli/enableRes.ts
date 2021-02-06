import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { setEnabled } from '../../utils/setEnabled';

module.exports = class EnableResCommand extends (
  Command
) {
  constructor(client: Client) {
    super(client, {
      name: 'enableres',
      aliases: ['enable-res'],
      group: 'eli',
      memberName: 'enableres',
      description: 'Enables a response.',
      ownerOnly: true,
      args: [
        {
          key: 'input',
          prompt: 'What message do you want to enable?',
          type: 'string',
        },
      ],
    });
  }

  run(message: CommandoMessage, { input }: { input: string }) {
    return setEnabled(input, true).then(() =>
      message.say(`Enabled the following message: ${input}`)
    );
  }
};
