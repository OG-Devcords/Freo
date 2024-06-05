const { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const messages = require(`${process.cwd()}/src/giveaways/config/message`);
module.exports = {
  name: "drop",
  description: "drop a giveaway",
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
                name: 'winners',
                description: 'How many winners the giveaway should have',
                type: ApplicationCommandOptionType.Integer,
                required: true
            },
                {
                    name: 'prize',
                    description: 'What the prize of the giveaway should be',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'channel',
                    description: 'The channel to start the giveaway in',
                    type: ApplicationCommandOptionType.Channel,
                    channel_types: [ChannelType.GuildText],
                    required: false
                }],
  run: async (client, interaction) => {
    try {

        const giveawayChannel = interaction.options.getChannel('channel') || interaction.channel;
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
        
        if (giveawayWinnerCount < 1) {
    return interaction.reply({
        content: `${client.emotes.wrong} Please select a valid winner count! Greater or equal to one.`,
    });
}
        client.giveawaysManager.start(giveawayChannel, {
    winnerCount: giveawayWinnerCount,
    prize: giveawayPrize,
    hostedBy: client.gconfig.hostedBy ? interaction.user : null,
    isDrop: true,
    messages
});

await interaction.reply(`<:tick:1247607047101616263> Giveaway started in ${giveawayChannel}!`);

    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};