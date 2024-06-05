const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "resume",
  description: "resume and paused giveaway.",
  usage: "",
  category: "giveaway",
  userPerms: ["ManageGuild"],
  botPerms: [""],
  cooldown: 5,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  type: ApplicationCommandType.ChatInput,
  options: [{
                name: 'giveaway',
                description: 'The giveaway to pause (message ID or giveaway prize)',
                type: ApplicationCommandOptionType.String,
                required: true
            }],
  run: async (client, interaction) => {
    try {
      const query = interaction.options.getString('giveaway');

const giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
    client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

if (!giveaway) {
    return interaction.reply({
        content: `<:cross:1247607041908936844> Unable to find a giveaway for ${query}`,
        ephemeral: true
    });
}

if (!giveaway.pauseOptions.isPaused) {
    return interaction.reply({
        content: `<:cross:1247607041908936844> **[This giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** is not paused!`,
        ephemeral: true
    });
}

client.giveawaysManager.unpause(giveaway.messageId)
    .then(() => {
        interaction.reply(`<:tick:1247607047101616263> **[This giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** has been successfully resumed!`);
    })
    .catch((e) => {
        interaction.reply({
            content: e,
            ephemeral: true
        });
    });

    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};