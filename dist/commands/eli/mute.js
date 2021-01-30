"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class MuteCommand extends (discord_js_commando_1.Command) {
    constructor(client) {
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
    run(message, { member, duration }) {
        const cache = member.roles.cache;
        member.roles.remove(cache);
        // add muted role
        member.guild.roles.fetch('496328284997419032').then((role) => {
            member.roles.add(role);
        });
        setTimeout(() => {
            // set back to regular
            member.roles.set(cache);
            message.channel.send(`${member} has been unmuted.`);
        }, duration * 60 * 1000); // minutes * seconds * milliseconds
        return message.say(`${member} has been muted.`);
    }
};
