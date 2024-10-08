const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const editJsonFile = require("edit-json-file");
let file = editJsonFile(`${__dirname}/config.json`);

module.exports = {  
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        if (interaction.isChatInputCommand()){
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        if (interaction.isButton()) {

            

            file.read();
            const washerEmbed = new EmbedBuilder()
                .setColor("#0000FF")
                .setTitle("Washer")
                .addFields(
                    { name: 'State', value: `${file.get('washerState') === 'on' ? 'On' : 'Off'}`, inline: true },
                )
            var washerOnButton = new ButtonBuilder()
                .setCustomId('washeron')
                .setLabel('On')
                .setEmoji('🟢')
                .setStyle(ButtonStyle.Success);
    
            var washerOffButton = new ButtonBuilder()
                .setCustomId('washeroff')
                .setLabel('Off')
                .setEmoji('🔴')
                .setStyle(ButtonStyle.Danger);

            var notifyWasherButton = new ButtonBuilder()
                .setCustomId('notifyWasher')
                .setLabel('Notify')
                .setEmoji('🔔')
                .setStyle(ButtonStyle.Secondary);

            file.read();
            const dryerEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("Dryer")
                .addFields(
                    { name: 'State', value: `${file.get('dryerState') === 'on' ? 'On' : 'Off'}`, inline: true },
                )
            var dryerOnButton = new ButtonBuilder()
                .setCustomId('dryeron')
                .setLabel('On')
                .setEmoji('🟢')
                .setStyle(ButtonStyle.Success);
    
            var dryerOffButton = new ButtonBuilder()
                .setCustomId('dryeroff')
                .setLabel('Off')
                .setEmoji('🔴')
                .setStyle(ButtonStyle.Danger);

            var notifyDryerButton = new ButtonBuilder()
                .setCustomId('notifyDryer')
                .setLabel('Notify')
                .setEmoji('🔔')
                .setStyle(ButtonStyle.Secondary);

             if (interaction.customId === 'washeron') {
                 await interaction.deferUpdate()
                 file.set('washerState', 'on');
                 file.save();
                 file.read();
                 washerEmbed.setFields(
                    { name: 'State', value: `${file.get('washerState') === 'on' ? 'On' : 'Off'}`, inline: true },
                    { name: 'Last changed by', value: `${interaction.user.displayName} <t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                )
                var message = interaction.channel.messages.cache.get(interaction.message.id) || await interaction.channel.messages.fetch(interaction.message.id)
                const row = new ActionRowBuilder().addComponents( washerOnButton.setDisabled(true), washerOffButton.setDisabled(false), notifyWasherButton );
                message.edit({ embeds: [washerEmbed], components: [row] })

             } else if (interaction.customId === 'washeroff') {
                 await interaction.deferUpdate()
                 file.set('washerState', 'off');
                 file.save();
                 file.read();
                 washerEmbed.setFields(
                    { name: 'State', value: `${file.get('washerState') === 'on' ? 'On' : 'Off'}`, inline: true },
                    { name: 'Last changed by', value: `${interaction.user.displayName} <t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                )
                var message = interaction.channel.messages.cache.get(interaction.message.id) || await interaction.channel.messages.fetch(interaction.message.id)
                const row = new ActionRowBuilder().addComponents( washerOnButton.setDisabled(false), washerOffButton.setDisabled(true), notifyWasherButton );
                message.edit({ embeds: [washerEmbed], components: [row] })
             }

             if (interaction.customId === 'dryeron') {
                await interaction.deferUpdate()
                file.set('dryerState', 'on');
                file.save();
                file.read();
               dryerEmbed.setFields(
                   { name: 'State', value: `${file.get('dryerState') === 'on' ? 'On' : 'Off'}`, inline: true },
                   { name: 'Last changed by', value: `${interaction.user.displayName} <t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
               )
               var message = interaction.channel.messages.cache.get(interaction.message.id) || await interaction.channel.messages.fetch(interaction.message.id)
               const row = new ActionRowBuilder().addComponents( dryerOnButton.setDisabled(true), dryerOffButton.setDisabled(false), notifyDryerButton );
               message.edit({ embeds: [dryerEmbed], components: [row] })

            } else if (interaction.customId === 'dryeroff') {
                await interaction.deferUpdate()
                file.set('dryerState', 'off');
                file.save();
                file.read();
                dryerEmbed.setFields(
                    { name: 'State', value: `${file.get('dryerState') === 'on' ? 'On' : 'Off'}`, inline: true },
                    { name: 'Last changed by', value: `${interaction.user.displayName} <t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                )
               var message = interaction.channel.messages.cache.get(interaction.message.id) || await interaction.channel.messages.fetch(interaction.message.id)
               const row = new ActionRowBuilder().addComponents( dryerOnButton.setDisabled(false), dryerOffButton.setDisabled(true), notifyDryerButton );
               message.edit({ embeds: [dryerEmbed], components: [row] })
            } else if (interaction.customId === 'notifyWasher') {
                await interaction.deferUpdate()
                interaction.followUp({ content: 'Okay, you will be notified when the washer status changes', ephemeral: true })

                file.set('notify.washer.jared', false);
                file.set('notify.washer.spencer', false);
                file.set('notify.dryer.jared', false);
                file.set('notify.dryer.spencer', false);
                file.save();
            } else if (interaction.customId === 'notifyDryer') {
                await interaction.deferUpdate()
                interaction.followUp({ content: 'Okay, you will be notified when the dryer status changes', ephemeral: true })
            }
         }

    }
}