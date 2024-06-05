const config = require('./config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<:gift:1247604864008196188> **GIVEAWAY** <:gift:1247604864008196188>",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<:giftOpen:1247604866885353473> **GIVEAWAY ENDED** <:giftOpen:1247604866885353473>",
    giveawayEndedButton: 'Go to the giveaway',
    title: '{this.prize}',
    inviteToParticipate: '### React with <:tada:1247604977036296284> to participate!',
    winMessage: '<:tada:1247604977036296284> Congratulations, {winners}! You won **{this.prize}**! <:tada:1247604977036296284>',
    drawing: '<:clock:1247606513372233880> Drawing: {timestamp-relative} ({timestamp-default})',
    dropMessage: '<:sparkle:1247604906836234442> Be the first to react with <:tada:1247604977036296284> !',
    embedFooter: '{this.winnerCount} winner(s)',
    noWinner: '<:cross:1247607041908936844> Giveaway cancelled, no valid participations.',
    winners: '<:giftOpen:1247604866885353473> Winner(s):',
    endedAt: 'Ended at',
    hostedBy: '<:crown:1247604920732094664> Hosted by: {this.hostedBy}',
    participants: '<:members:1247604960217010236> Number of Participants: {participants}\nLatest Joined Member {member}',
};