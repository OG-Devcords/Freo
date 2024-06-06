const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
	name: 'help',
	description: "help menu of Flux",
  usage: "",
  category: "info",
	userPerms: [''],
	botPerms: [''],
	cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
    try{
        
        const embed = client.Embed()
        .setAuthor({ name: "Flux's Help Menu", iconURL: `${interaction.user.displayAvatarURL()}`})
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setImage("https://media.discordapp.net/attachments/1149027807054278666/1247996884535087275/standard.gif?ex=66620f2b&is=6660bdab&hm=381c63d52ce32acec6039bdc8c1f38df660527a106dbe98f7c492fcb7f5eb361&")
        .addFields(
        { name: "<:information:1247604953376227388> Information [4]", value: `${client.slashCommands.filter((cmd) => cmd.category === "info").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲") || "No slash command in this category"}`, inline: true},
        { name: "<:rocket:1247604891321630751> Giveaway [2]", value: `${client.slashCommands.filter((cmd) => cmd.category === "giveaway").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲") || "No slash command in this category"}`, inline: true}
        )
        const row = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
            .setLabel("Invite")
            .setEmoji("<:link:1247604949878051037>")            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.config.CLIENT_ID}&permissions=8&scope=bot+applications.commands`),
        new ButtonBuilder()
            .setLabel("Support")
            .setEmoji("<:topgg:1248007352549113997>")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://top.gg/bot/${client.config.CLIENT_ID}/vote`),
        new ButtonBuilder()
            .setLabel("Source Code")
            .setEmoji("<:github:1247604964071833671>")
            .setStyle(ButtonStyle.Link)
            .setURL("https://github.com/devanshyadav2010/Flux"),
        )
        
        await interaction.reply({ embeds: [embed], components: [row] })
        
                 } catch (error){
      client.slash_err(client, interaction, error);
    }
	}
};
