const { Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        if (oldState.channelId && oldState.channelId !== newState.channelId) {
        }

        if (newState.channelId !== null && newState.channelId !== oldState.channelId) {
            newState.client.channels.fetch(newState.channelId).then(channel => {
                channel.send(`[<t:${Math.floor(Date.now() / 1000)}:R>] ${newState.member.user.globalName} joined the voice channel!`);
            });
        } else if(oldState.channelId !== null && oldState.channelId !== newState.channelId) {
            oldState.client.channels.fetch(oldState.channelId).then(channel => {
                channel.send(`[<t:${Math.floor(Date.now() / 1000)}:R>] ${oldState.member.user.globalName} left the voice channel!`);
            });
        }
    },
};