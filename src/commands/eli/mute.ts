import { GuildMember, Role } from 'discord.js';
import { Client, Command, CommandoMessage } from 'discord.js-commando';
module.exports = class MuteCommand extends (
  Command
) {
  constructor(client: Client) {
    super(client, {
      name: 'mute',
      aliases: ['silence', 'oppress'],
      group: 'eli',
      memberName: 'mute',
      description: 'Mutes a member.',
      ownerOnly: true,
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to mute?',
          type: 'member',
        },
        {
          key: 'duration',
          prompt: 'How long do you want to mute them for?',
          type: 'integer',
        },
      ],
    });
  }

  run(
    message: CommandoMessage,
    { member, duration }: { member: GuildMember; duration: number }
  ) {
    const cache = member.roles.cache;
    member.roles.remove(cache);
    // add muted role
    member.guild.roles.fetch('496328284997419032').then((role) => {
      member.roles.add(role as Role);
    });
    setTimeout(() => {
      // set back to regular
      member.roles.set(cache);
      message.channel.send(`${member} has been unmuted.`);
    }, duration * 60 * 1000); // minutes * seconds * milliseconds
    return message.say(`${member} has been muted.`);
  }
};
