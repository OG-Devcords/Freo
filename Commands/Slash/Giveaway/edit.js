const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "edit",
  description: "edit a running giveaway.",
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
                description: 'The giveaway to end (message ID)',
                type: ApplicationCommandOptionType.String,
                required: true
            },
                {
                    name: 'duration',
                    description: 'Setting time of mentioned giveaway. Eg. 1h sets the current giveaway to end after an hour!',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
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
                }],
  run: async (client, interaction) => {
    try {
                const gid = interaction.options.getString('giveaway');
                const time = interaction.options.getString('duration');
                const winnersCount = interaction.options.getInteger('winners');
                const prize = interaction.options.getString('prize');
                let duration;
                if (time.startsWith("-")) {
                    duration = -ms(time.substring(1));
                } else {
                    duration = ms(time);
                }

                if (isNaN(duration)) {
                    return interaction.reply({
                        content: `<:cross:1247607041908936844> Please select a valid duration!`,
                        ephemeral: true,
                    });
                }
                await interaction.deferReply({
                    ephemeral: true
                })
                try {
                    await client.giveawaysManager.edit(gid, {
                        newWinnerCount: winnersCount,
                        newPrize: prize,
                        addTime: time
                    })
                } catch (e) {
                    return interaction.editReply({
                        content:
                        `<:tick:1247607047101616263> No giveaway found with the given message ID: \`${gid}\``,
                        ephemeral: true
                    });
                }
                interaction.editReply({
                    content:
                    `<:tick:1247607047101616263> This giveaway has now been edited!`,
                    ephemeral: true
                });
    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};