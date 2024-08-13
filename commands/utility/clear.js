const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('clear')
        .setDescription('Clears messages.')

        .addSubcommand(subcommand =>
            subcommand
                .setName('recent')
                .setDescription('Clears most recent x messages.  (Doesnt work for older messages)')
                .addIntegerOption(option =>
                    option
                        .setName('amount')
                        .setDescription('The amount of messages to clear.')
                        .setRequired(true)
                        .setMinValue(1)
                        .setMaxValue(100)
                ),
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Clears all messages from a user.')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to clear messages of.')
                        .setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('byword')
                .setDescription('Clears all messages with a certain word.')
                .addStringOption(option =>
                    option
                        .setName('word')
                        .setDescription('The word to clear messages with.')
                        .setRequired(true)
                )
        ), 
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'recent') {
            const amount = interaction.options.getInteger('amount');
            await interaction.channel.bulkDelete(amount, true);
            await interaction.deferReply();
            await interaction.editReply({ content: `Cleared ${amount} messages.`}).then(() => { setTimeout(() => { interaction.deleteReply(); }, 5000); })
        } else if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('user');

            const messages = await interaction.channel.messages.fetch();
            const filtered = messages.filter(msg => msg.author.id === user.id);
            await interaction.channel.bulkDelete(filtered, true);
            await interaction.deferReply();
            await interaction.editReply({ content: `Cleared all messages from ${user.tag}.`}).then(() => { setTimeout(() => { interaction.deleteReply(); }, 5000); })
        } else if (interaction.options.getSubcommand() === 'byword') {
            const word = interaction.options.getString('word');
            
            const messages = await interaction.channel.messages.fetch();
            const filtered = messages.filter(msg => msg.content.toUpperCase().includes(word.toUpperCase()));
            await interaction.channel.bulkDelete(filtered, true);
            await interaction.deferReply();
            await interaction.editReply({ content: `Cleared all messages with the word ${word}.`}).then(() => { setTimeout(() => { interaction.deleteReply(); }, 5000); })
        }
    }
}