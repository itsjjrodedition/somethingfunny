const { Events } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState, newState) {
        if (oldState.channelId && oldState.channelId !== newState.channelId) {
        }

        if (newState.channelId !== null && newState.channelId !== oldState.channelId) {
            newState.client.channels.fetch(newState.channelId).then(channel => {
                if (channel.id != '624839576204345354') return
                
                // channel.send(`[<t:${Math.floor(Date.now() / 1000)}:R>] ${newState.member.user.globalName} joined the voice channel!`);
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });

                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Pause
                    }
                });
                const resource = createAudioResource('./data/static.mp3');
                player.play(resource);
                connection.subscribe(player);
                

                player.on(AudioPlayerStatus.Playing, () => {
                    console.log('The audio player has started playing!');
                });
                
                player.on(AudioPlayerStatus.Idle, () => {
                    console.log('The audio player has stopped playing!');
                });

                player.on(AudioPlayerStatus.Buffering, () => {
                    console.log('The audio player is buffering!');
                })

                player.on('error', error => {
                    console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
                });

            });
        } else if(oldState.channelId !== null && oldState.channelId !== newState.channelId) {
            oldState.client.channels.fetch(oldState.channelId).then(channel => {
                // channel.send(`[<t:${Math.floor(Date.now() / 1000)}:R>] ${oldState.member.user.globalName} left the voice channel!`);
            });
        }
    },
};