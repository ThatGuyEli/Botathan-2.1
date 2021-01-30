import { Client, Command, CommandoMessage } from 'discord.js-commando';
module.exports = class SnapCommand extends (
  Command
) {
  constructor(client: Client) {
    super(client, {
      name: 'snap',
      aliases: ['thanos', 'kill', 'delete'],
      group: 'eli',
      memberName: 'snap',
      description: 'Deletes a set amount of messages.',
      ownerOnly: true,
      args: [
        {
          key: 'count',
          prompt: 'How many messages do you want to delete?',
          type: 'integer',
        },
      ],
    });
  }

  run(message: CommandoMessage, { count }: { count: number }) {
    message.channel.messages.fetch({ limit: count }).then((messages) =>
      messages.forEach((message) => {
        message.delete();
      })
    );
    return message.say(`Deleted ${count} messages.`);
  }
};
