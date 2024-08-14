const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonComponent, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("display")
        .setDescription("Display the status of something.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("washer")
                .setDescription("Display the status of the washer.")
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("dryer")
                .setDescription("Display the status of the dryer.")
        ),


    async execute(interaction) {

        if (interaction.options.getSubcommand() === "washer") {
            const embed = new EmbedBuilder()
                .setColor("#0000FF")
                .setTitle("Washer")
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
       
        const row = new ActionRowBuilder()
            .addComponents( washerOnButton, washerOffButton.setDisabled(true), notifyWasherButton );
        await interaction.reply({ embeds: [embed], components: [row] });

        } else if (interaction.options.getSubcommand() === "dryer") {
            const embed = new EmbedBuilder()    
                .setColor("#FF0000")
                .setTitle("Dryer")

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

            const row = new ActionRowBuilder()
                .addComponents( dryerOnButton, dryerOffButton.setDisabled(true), notifyDryerButton );

            await interaction.reply({ embeds: [embed], components: [row] });
        
        }

    }
};
