const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('clear')
        .setDescription('Clears messages.')
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('The amount of messages to clear.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply({ content: `Cleared ${amount} messages.`, ephemeral: true });
    }
}