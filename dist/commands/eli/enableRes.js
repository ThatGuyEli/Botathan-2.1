"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const setEnabled_1 = require("../../utils/setEnabled");
module.exports = class EnableResCommand extends (discord_js_commando_1.Command) {
    constructor(client) {
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
    run(message, { input }) {
        return setEnabled_1.setEnabled(input, true).then(() => message.say(`Enabled the following message: ${input}`));
    }
};
