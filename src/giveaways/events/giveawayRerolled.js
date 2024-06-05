const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  async execute(giveaway, winners, client) {
    winners.forEach((member) => {
      member.send({

        components: [new ActionRowBuilder()
                    .addComponents(
                          new ButtonBuilder()
                      .setLabel("Jump to the Giveaway")
                      .setStyle(ButtonStyle.Link)
                      .setURL(`https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}`)
                      .setEmoji("<:tada:1247604977036296284>"),
                    new ButtonBuilder()
                      .setLabel("Vote Me")
                      .setStyle(ButtonStyle.Link)
                      .setURL("https://top.gg/bot/1016392200516550736/vote")
                      .setEmoji("<:link:1247604949878051037>"),
                          new ButtonBuilder()
                      .setLabel("Invite Me")
                      .setStyle(ButtonStyle.Link)
                      .setURL("https://discord.com/api/oauth2/authorize?client_id=1016392200516550736&permissions=2146958591&scope=bot%20applications.commands")
                      .setEmoji("<:link:1247604949878051037>"))],
        
        embeds: [client.Embed()
          .setAuthor({name: "Congratulations!", iconURL: client.user.displayAvatarURL()})
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`<:arrow:1247608720767193108> Hello there ${member.user}\n<:arrow:1247608720767193108> Host of the giveaway rerolled and you won the Giveaway!\n<:arrow:1247608720767193108> Good Job On Winning **${giveaway.prize}!** <:tada:1247604977036296284><:tada:1247604977036296284>\n<:arrow:1247608720767193108> DM ${giveaway.hostedBy} to claim your prize!!`)
          .setTimestamp()
          
        ]
      }).catch(e => {})
    });
  }
}
