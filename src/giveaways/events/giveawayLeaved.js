const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  async execute(giveaway, member, interaction, client) {
    await interaction.reply({ content: 'You have leaved this giveaway.', ephemeral: true })
    return member.send({

      components: [new ActionRowBuilder()
                    .addComponents(
                          new ButtonBuilder()
                      .setLabel("Jump to the Giveaway")
                      .setStyle(ButtonStyle.Link)
                      .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
                      .setEmoji("<:tada:1247604977036296284>"))],
      
      embeds: [client.Embed()
        .setTimestamp()
        .setAuthor({name: "Entry Removed!", iconURL: client.user.displayAvatarURL()})
        .setTitle('Did You Just Left From A Giveaway?')
        .setDescription(
          `<:arrow:1247608720767193108> Your entery to **${giveaway.prize}** on [This Server](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) have been removed!\n<:arrow:1247608720767193108> This means you're removed as a valid giveaway participant.\n<:arrow:1247608720767193108> Think It was a mistake? **Go react again!**`
        )
      ]
    }).catch(e => {})

  }
}
