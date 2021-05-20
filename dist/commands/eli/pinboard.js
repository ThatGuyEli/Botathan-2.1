"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const tallyPins_1 = require("../../utils/tallyPins");
module.exports = class PinboardCommand extends discord_js_commando_1.Command {
    constructor(client) {
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
    run(message, { channel }) {
        return channel.messages.fetchPinned().then((pins) => {
            const tallies = tallyPins_1.tallyPins(pins).sort((a, b) => {
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
            let str = `${channel} Pins Tally\n`;
            tallies.forEach(t => {
                str += `${t.user.username}: ${t.count}\n`;
            });
            return message.say(str);
        });
    }
};
