const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const messages = require(`${process.cwd()}/src/giveaways/config/message`);
const ms = require("ms")
module.exports = {
  name: "create",
  description: "initiate a giveaway",
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
            name: 'duration',
            description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
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
            },
            {
                name: 'channel',
                description: 'The channel to start the giveaway in',
                type: ApplicationCommandOptionType.Channel,
                channel_types: [ChannelType.GuildText],
                required: false
            },
            {
                name: 'ping',
                description: 'ping a role for giveaway ping',
                type: ApplicationCommandOptionType.Role,
                required: false
            },
            {
                name: 'bonusrole',
                description: 'Role which would recieve bonus entries',
                type: ApplicationCommandOptionType.Role,
                required: false
            },
            {
                name: 'bonusamount',
                description: 'The amount of bonus entries the role will recieve',
                type: ApplicationCommandOptionType.Integer,
                required: false
            },
            {
                name: 'invite',
                description: 'Invite of the server you want to add as giveaway joining requirement',
                type: ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: 'role',
                description: 'Role you want to add as giveaway joining requirement',
                type: ApplicationCommandOptionType.Role,
                required: false
            },
            {
                name: "sponsor",
                description: 'User who sponsered this giveaway',
                type: ApplicationCommandOptionType.User,
                required: false
            },
            {
                name: 'thumbnail',
                description: 'thumbnail you want to add in giveaway embed',
                type: 3,
                required: false
            },
            {
                name: 'image',
                description: 'image you want to add in giveaway embed',
                type: 3,
                required: false
            },
            {
                name: 'message',
                description: 'message you want to send in giveaway channel',
                type: 3,
                required: false
            },

        ],
  run: async (client, interaction) => {
    try {
                const giveawayChannel = interaction.options.getChannel('channel') || interaction.channel;
                const giveawayDuration = interaction.options.getString('duration');
                const giveawayWinnerCount = interaction.options.getInteger('winners');
                const giveawayPrize = interaction.options.getString('prize');

                if (isNaN(ms(giveawayDuration))) {
                    return interaction.reply({
                        content: `<:cross:1247607041908936844> Please select a valid duration!`,
                        ephemeral: true
                    });
                }
                if (giveawayWinnerCount < 1) {
                    return interaction.reply({
                        content: `<:cross:1247607041908936844> Please select a valid winner count! greater or equal to one.`,
                    })
                }

                const ping = interaction.options.getRole('ping')
                const bonusRole = interaction.options.getRole('bonusrole')
                const bonusEntries = interaction.options.getInteger('bonusamount')
                let rolereq = interaction.options.getRole('role')
                let thumbnail = interaction.options.getString('thumbnail')
                let invite = interaction.options.getString('invite')
                let sponsor = interaction.options.getUser("sponsor")
                let image = interaction.options.getString('image')
                let message = interaction.options.getString("message")

                if (bonusRole) {
                    if (!bonusEntries) {
                        return interaction.reply({
                            content: `<:cross:1247607041908936844> You must specify how many bonus entries would ${bonusRole} recieve!`,
                            ephemeral: true
                        });
                    }
                }


                let reqinvite;
                if (invite) {
                    let invitex = await client.fetchInvite(invite)
                    let client_is_in_server = client.guilds.cache.get(
                        invitex.guild.id
                    )
                    reqinvite = invitex
                    if (!client_is_in_server) {
                        const gaEmbed = {
                            author: {
                                name: client.user.username,
                                iconURL: client.user.displayAvatarURL()
                            },
                            title: "Server Check!",
                            description:
                            "Woah woah woah! I see a new server! are you sure I am in that? You need to invite me there to set that as a requirement!",
                            timestamp: new Date(),
                            footer: {
                                iconURL: client.user.displayAvatarURL(),
                                text: "Server Check"
                            }
                        }
                        return interaction.editReply({
                            embeds: [gaEmbed]})
                    }
                }

                if (rolereq && invite && bonusRole && sponsor) {
    messages.inviteToParticipate = `### **React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (rolereq && invite && bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}`;
} else if (rolereq && invite && !bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (rolereq && invite && !bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})`;
} else if (rolereq && !invite && bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (rolereq && !invite && bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}`;
} else if (rolereq && !invite && !bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (rolereq && !invite && !bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Required Role:** ${rolereq}`;
} else if (!rolereq && invite && bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (!rolereq && invite && bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}`;
} else if (!rolereq && invite && !bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (!rolereq && invite && !bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Extra Req:** [join this server](${invite})`;
} else if (!rolereq && !invite && bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
} else if (!rolereq && !invite && bonusRole && !sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Bonus Role:** ${bonusRole}\n<:arrow:1247608720767193108> **Bonus Entries:** ${bonusEntries}`;
} else if (!rolereq && !invite && !bonusRole && sponsor) {
    messages.inviteToParticipate = `**React with <:tada:1247604977036296284> to participate!**\n<:arrow:1247608720767193108> **Sponsored By:** ${sponsor}`;
}





                if (!message && ping) {
                    messages.giveaway = `${ping}`
                }

                // start giveaway
  

                client.giveawaysManager.start(giveawayChannel, {
                    // The giveaway duration
                    duration: ms(giveawayDuration),
                    // The giveaway prize
                    prize: giveawayPrize,
                    // The giveaway winner count
                    winnerCount: parseInt(giveawayWinnerCount),
                    // Hosted by
                    hostedBy: client.gconfig.hostedBy ? interaction.user: null,
                    thumbnail: thumbnail || interaction.guild.iconURL({ dynamic: true }),
                    image: image,
                    // BonusEntries If Provided
                    bonusEntries: [{
                        bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
                        cumulative: false
                    }],
                    // Messages
                    messages,
                    extraData: {
                        server: reqinvite == null ? "null": reqinvite.guild.id,
                        role: rolereq == null ? "null": rolereq.id,
                    },
                    exemptMembers: (member) => !member.roles.cache.has(rolereq ? rolereq.id : '')
});

                await interaction.reply({
                    content:
                    `<:tick:1247607047101616263> Giveaway started in ${giveawayChannel}!`,
                    ephemeral: true
                })

                if (message && ping) {

                    let giveaway = new EmbedBuilder()
                    .setTitle(`<:tada:1247604977036296284> Giveaway <:tada:1247604977036296284>`)
                    .setDescription(
                        `**${message}**`
                    )
                    .setColor(client.color)
                    .setTimestamp();
                    await giveawayChannel.send({
                        content: `${ping}`, embeds: [giveaway]
                   });
                } else if (message && !ping) {

                    let giveaway = new EmbedBuilder()
                    .setTitle(`<:tada:1247604977036296284> Giveaway <:tada:1247604977036296284>`)
                    .setDescription(
                        `**${message}**`
                    )
                    .setColor(client.color)
                    .setTimestamp();
                    await giveawayChannel.send({
                        embeds: [giveaway]
                    });
                }

    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};