import { Client, Command, CommandoMessage } from 'discord.js-commando';
module.exports = class PinsCommand extends (
  Command
) {
  constructor(client: Client) {
    super(client, {
      name: 'pins',
      aliases: ['pincount', 'pin-count', 'pin_count'],
      group: 'common',
      memberName: 'pins',
      description: 'Returns the number of pins in the channel.',
    });
  }

  run(message: CommandoMessage) {
    return message.channel.messages
      .fetchPinned()
      .then((pins) => message.say(`Pins: ${pins.size}`));
  }
};