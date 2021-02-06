"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const setEnabled_1 = require("../../utils/setEnabled");
module.exports = class DisableResCommand extends (discord_js_commando_1.Command) {
    constructor(client) {
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
    run(message, { input }) {
        return setEnabled_1.setEnabled(input, false).then(() => message.say(`Disabled the following message: ${input}`));
    }
};
