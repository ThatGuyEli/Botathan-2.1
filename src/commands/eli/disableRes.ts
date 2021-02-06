import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { setEnabled } from '../../utils/setEnabled';

module.exports = class DisableResCommand extends (
  Command
) {
  constructor(client: Client) {
    super(client, {
      name: 'disableres',
      aliases: ['disable-res'],
      group: 'eli',
      memberName: 'disableres',
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
    return setEnabled(input, false).then(() =>
      message.say(`Disabled the following message: ${input}`)
    );
  }
};
