const { ApplicationCommandType } = require('discord.js');

module.exports = {
  name: "list",
  description: "Get the list of all running giveaways.",
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
  run: async (client, interaction) => {
    try {
      let giveaways = client.giveawaysManager.giveaways.filter(
        (g) => g.guildId === `${interaction.guild.id}` && !g.ended
      );

      if (!giveaways.some((e) => e.messageId)) {
        return interaction.reply(`<:reload:1247604873155973121> No Giveaways To Be Displayed`);
      }

      let embed = client.Embed()
        .setTitle('Currently Active Giveaways')
        .setColor(client.color)
        .setFooter({
          text: `Requested by ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp();

      await Promise.all(
        giveaways.map(async (x) => {
          embed.addFields({
            name: 'Normal Giveaway:',
            value: `<:arrow:1247608720767193108> **Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})**\n<:arrow:1247608720767193108> **Started:** <t:${((x.startAt) / 1000).toFixed(0)}:R> (<t:${((x.startAt) / 1000).toFixed(0)}:f>)\n<:arrow:1247608720767193108> **Ends:** <t:${((x.endAt) / 1000).toFixed(0)}:R> (<t:${((x.endAt) / 1000).toFixed(0)}:f>)`,
          });
        })
      );

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};
