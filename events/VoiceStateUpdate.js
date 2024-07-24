const { Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        console.log(oldState.channelId);
        console.log(newState.channelId);

        if (oldState.channelId && oldState.channelId !== newState.channelId) {
            console.log('Voice channel changed');
        }

        if (newState.channelId !== null && newState.channelId !== oldState.channelId) {
            console.log('Voice channel joined');
            newState.client.channels.fetch(newState.channelId).then(channel => {
                channel.send(`[<t:${Math.floor(Date.now() / 1000)}:R>] ${newState.member.user} joined the voice channel!`);
            });
        } else if(oldState.channelId !== null && oldState.channelId !== newState.channelId) {
            console.log('Voice channel left');
            oldState.client.channels.fetch(oldState.channelId).then(channel => {
                channel.send(`[<t:${Math.floor(Date.now() / 1000)}:R>] ${oldState.member.user} left the voice channel!`);
            });
        }
    },
};