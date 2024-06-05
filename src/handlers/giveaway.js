const { GiveawaysManager } = require('vante-giveaways');
const giveawayModel = require(`${process.cwd()}/src/database/Giveaway.js`);
const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (client) => {
        const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
            async getAllGiveaways() {
                return await giveawayModel.find().lean().exec();
            }

            async saveGiveaway(messageId, giveawayData) {
                await giveawayModel.create(giveawayData);
                return true;
            }

            async editGiveaway(messageId, giveawayData) {
                await giveawayModel.updateOne({ messageId }, giveawayData).exec();
                return true;
            }

            async deleteGiveaway(messageId) {
                await giveawayModel.deleteOne({ messageId }).exec();
                return true;
            }
        };

        const manager = new GiveawayManagerWithOwnDatabase(client, {
            default: {
                buttonEmoji: "<:tada2:1247609992790540288>",
                buttonStyle: Discord.ButtonStyle.Secondary,
                embedColor: '#f90d64',
                embedColorEnd: '#f90d64',
            }
        });

        client.giveawaysManager = manager;

        fs.readdir(`${process.cwd()}/src/giveaways/events`, (_err, files) => {
            let g = 0;
            files.forEach((file) => {
                if (!file.endsWith(".js")) return;
                const event = require(`${process.cwd()}/src/giveaways/events/${file}`);
                let eventName = file.split(".")[0];
                client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client));
                delete require.cache[require.resolve(`${process.cwd()}/src/giveaways/events/${file}`)];
                g++;
            });

            client.logger(`Loaded ${g} Giveaway Events`.bold);
        });
    };