const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Changes the nickname of a user.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Sets the nickname of a user.')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to set the nickname of.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('nickname')
                        .setDescription('The nickname to set.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand  
                .setName('all')
                .setDescription('Sets the nickname of all users.')
                .addStringOption(option =>
                    option
                        .setName('nickname')
                        .setDescription('The nickname to set.')
                        .setRequired(true)
                )
        )
        .addSubcommand (subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes the nickname of a user.')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to remove the nickname of.')
                        .setRequired(true)
                )
        )
        .addSubcommand (subcommand =>
            subcommand
                .setName('removeall')
                .setDescription('Removes the nickname of all users.')
        )
        ,
    async execute(interaction) {    
        if (interaction.options.getSubcommand() === 'set') {
            const user = interaction.options.getUser('user');
            const nickname = interaction.options.getString('nickname');
            await interaction.guild.members.cache.get(user.id).setNickname(nickname);
            await interaction.reply({ content: `Set nickname of ${user.tag} to ${nickname}.`, ephemeral: true});
        } else if (interaction.options.getSubcommand() === 'all') {
            await interaction.deferReply( { ephemeral: true } );
            const nickname = interaction.options.getString('nickname');
            const members = await interaction.guild.members.fetch();
            console.log(members);
            members.each(async (member) => {
                interaction.followUp({
                    content: `Manageable: ${member.manageable}, Nickname: ${member.nickname}, Display name: ${member.displayName}`, ephemeral: true
                });
                if(!member.manageable) return;
                await member.setNickname(nickname);
            });
            await interaction.editReply({ content: `Setting nickname of all members to ${nickname}.`, ephemeral: true });
        } else if (interaction.options.getSubcommand() === 'remove') {
            const user = interaction.options.getUser('user');
            await interaction.guild.members.cache.get(user.id).setNickname(null);
            await interaction.reply({ content: `Removed nickname of ${user.tag}.`, ephemeral: true});
        } else if (interaction.options.getSubcommand() === 'removeall') {
            await interaction.deferReply( { ephemeral: true } );
            const members = await interaction.guild.members.fetch();
            members.each(async (member) => {
                interaction.followUp({
                    content: `Manageable: ${member.manageable}, Nickname: ${member.nickname}, Display name: ${member.displayName}`, ephemeral: true
                });
                if(!member.manageable) return;
                await member.setNickname(null);
            });
            await interaction.editReply({ content: `Removing nickname of all members.`, ephemeral: true });
        }
    }
}