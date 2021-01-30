"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class SnapCommand extends (discord_js_commando_1.Command) {
    constructor(client) {
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
    run(message, { count }) {
        message.channel.messages.fetch({ limit: count }).then((messages) => messages.forEach((message) => {
            message.delete();
        }));
        return message.say(`Deleted ${count} messages.`);
    }
};
