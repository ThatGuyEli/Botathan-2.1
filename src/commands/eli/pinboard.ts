import { TextChannel } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
import { tally } from '../../utils/tally';
import { tallyPins } from '../../utils/tallyPins';

module.exports = class PinboardCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'pinboard',
      group: 'eli',
      memberName: 'pinboard',
      description: 'Gives pin board for a specified channel.',
      ownerOnly: true,
      args: [
        {
          key: 'channel',
          prompt: 'What channel?',
          type: 'channel',
        },
      ],
    });
  }

  run(message: CommandoMessage, { channel }: { channel: TextChannel }) {
    return channel.messages.fetchPinned().then((pins) => {
      const tallies: Array<tally> = tallyPins(pins).sort((a, b) => {
        const aName = a.user.username.toLowerCase();
        const bName = b.user.username.toLowerCase();
        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }
        return 0;
      });
      let str: string = `${channel} Pins Tally\n`;
      tallies.forEach(t => {
        str += `${t.user.username}: ${t.count}\n`
      });
      return message.say(str);
    });
  }
};
