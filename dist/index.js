"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = __importDefault(require("discord.js-commando"));
const path_1 = require("path");
const client = new discord_js_commando_1.default.Client({
    commandPrefix: '-',
    owner: process.env.OWNER,
});
client.registry
    .registerGroups([
    ['common', 'Common commands'],
    ['eli', "Eli's commands"],
])
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
    eval: false,
})
    .registerCommandsIn(path_1.join(__dirname, 'commands'));
client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}! (${client.user?.id})`);
    console.log(`Current Servers: ${client.guilds.cache.map((guild) => guild.toString())}`);
    client.user?.setActivity("Eli's Bidding");
});
client.on('guildMemberAdd', (member) => {
    member.guild.systemChannel?.send(`Hello, ${member}!`);
});
client.on('guildMemberRemove', (member) => {
    // check audit logs for kick
    member.guild.fetchAuditLogs({ limit: 1 }).then((auditLogs) => {
        auditLogs.entries.forEach((entry) => {
            if (entry.action === 'MEMBER_KICK' && entry.target === member) {
                member.guild.systemChannel?.send(`${member} was kicked.`);
            }
            else {
                member.guild.systemChannel?.send(`Goodbye, ${member}.`);
            }
        });
    });
});
client.on('guildBanAdd', (guild, user) => {
    guild.systemChannel?.send(`${user} was banned.`);
});
client.on('guildBanRemove', (guild, user) => {
    guild.systemChannel?.send(`${user} was unbanned.`);
});
client.on('error', console.error);
client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channelID === newState.guild.afkChannelID) {
        newState.member?.send(process.env.AFK);
    }
});
client.on('channelPinsUpdate', (channel, date) => {
    const textChannel = channel;
    textChannel.messages
        .fetchPinned()
        .then((pins) => textChannel.send(`Pins: ${pins.size}`));
});
client.on('message', (msg) => {
    // Prevent infinite loops of the bot responding to itself
    if (msg.author === client.user)
        return;
    let content = msg.content;
    const responses = require('../data/responses.json');
    const res = responses.find((res) => {
        if (!res.caseSensitive)
            content = content.toLowerCase();
        if (!res.punctuationSensitive)
            content = content.replace(/[^a-z0-9 ]+/, '');
        return (res.enabled &&
            res.input === content &&
            (res.user === undefined || res.user === msg.author.id));
    });
    if (res)
        msg.channel.send(res.output);
});
client.login(process.env.TOKEN);
