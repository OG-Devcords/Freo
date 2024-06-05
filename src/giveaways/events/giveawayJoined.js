const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
  async execute(giveaway, member, interaction, client) {

    const noice = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Vote Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://top.gg/bot/1016392200516550736/vote")
          .setEmoji("<:link:1247604949878051037>"),

        new ButtonBuilder()
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/api/oauth2/authorize?client_id=1016392200516550736&permissions=2146958591&scope=bot%20applications.commands")
          .setEmoji("<:link:1247604949878051037>"),
    );
    
    let approved =  client.Embed()
    .setTimestamp()
    .setColor(client.color)
    .setAuthor({name: "Entry Confirmed!", iconURL: client.user.displayAvatarURL()})    
    .setDescription(
      `<:arrow:1247608720767193108> Your entry to **${giveaway.prize}** on [This Server](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been approved! \n<:arrow:1247608720767193108> Earn extra points by **Voting**. \n<:crown:1247604920732094664> Hosted By: ${giveaway.hostedBy}`
    )
    .setTimestamp()

    const lol = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Vote Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://top.gg/bot/1016392200516550736/vote")
          .setEmoji("<:link:1247604949878051037>"),
      
        new ButtonBuilder()
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/api/oauth2/authorize?client_id=973436715819745290&permissions=406881561681&scope=bot%20applications.commands")
          .setEmoji("<:link:1247604949878051037>"),
    );
    
   let denied =  client.Embed()
    .setTimestamp()
    .setAuthor({name: "Entry Confirm!", iconURL: client.user.displayAvatarURL()})    
    .setDescription(
      `<:arrow:1247608720767193108> Your entry to **${giveaway.prize}** on [This Server](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been confirmed!\n<:arrow:1247608720767193108> But you can't win the giveaway.\n<:arrow:1247608720767193108> Please review the requirements to enter the giveaway properly. \n<:crown:1247604920732094664> Hosted By: ${giveaway.hostedBy}`
    )

     let joinedUser = client.users.cache.get(interaction.user.id)
    if (interaction.user.bot) return;
    if(giveaway.extraData) {      
      if (giveaway.extraData.role !== "null" && !member.roles.cache.get(giveaway.extraData.role)) {
          
        await interaction.reply({ content: `<:cross:1247607041908936844> Your entry in this giveaway has been confirmed.\nBut you want win.\nPlease review the requirements to join the giveaway.`, ephemeral: true })
        return interaction.user.send({
          embeds: [denied],
          components: [lol]
        }).catch(e => {})
      }
    
       
   await interaction.reply({ content: `<:tada:1247604977036296284> You successfully joined the giveaway.`, ephemeral: true });
   
       await interaction.user.send({
        embeds: [approved],
        components: [noice]
      }).catch(e => {})
    } else {
        interaction.user.send({
          embeds: [approved]
        }).catch(e => {})
    
        }
    }
}
  
