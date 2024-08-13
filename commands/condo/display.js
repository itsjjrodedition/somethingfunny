const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonComponent, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("display")
        .setDescription("Display the status of something.")
        .addSubcommand(subcommand =>
            subcommand
                .setName("washer_dryer")
                .setDescription("Display the status of the washer and dryer.")
        ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === "washer_dryer") {
            const embed = new EmbedBuilder()
                .setColor("#0000FF")
                .setTitle("Washer")
        var onButton = new ButtonBuilder()
            .setCustomId('washeron')
            .setLabel('On')
            .setEmoji('🟢')
            .setStyle(ButtonStyle.Success);

        var offButton = new ButtonBuilder()
            .setCustomId('washeroff')
            .setLabel('Off')
            .setEmoji('🔴')
            .setStyle(ButtonStyle.Danger);
       
        const row = new ActionRowBuilder()
            .addComponents( onButton, offButton.setDisabled(true) );
        const row2 = new ActionRowBuilder()
            .addComponents( onButton.setDisabled(true), offButton );

        await interaction.reply({ embeds: [embed], components: [row] });

        }
        
    },
};
