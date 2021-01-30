"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
module.exports = class PinsCommand extends (discord_js_commando_1.Command) {
    constructor(client) {
        super(client, {
            name: 'pins',
            aliases: ['pincount', 'pin-count', 'pin_count'],
            group: 'common',
            memberName: 'pins',
            description: 'Returns the number of pins in the channel.',
        });
    }
    run(message) {
        return message.channel.messages
            .fetchPinned()
            .then((pins) => message.say(`Pins: ${pins.size}`));
    }
};
