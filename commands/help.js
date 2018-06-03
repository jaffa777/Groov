const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(!msg.member.roles.has("403973335521689601")) return;

    var help = [];
    help.push(":white_small_square: kick (User) - Kicks a member of this guild");
    help.push(":white_small_square: ban (User) - Bans a member of this guild");
    help.push(":white_small_square: mute (User) [dd:hh:mm] - Mutes a member of this guild");
    help.push(":white_small_square: unmute (User) - Unmutes a member of this guild");

    Client.embed.createEmbed(msg.channel, help, "Support - Help");
}