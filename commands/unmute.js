const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(!msg.member.roles.has("403973335521689601")) return;

    var member = msg.mentions.members.first();
    if(member.roles.has("403973188255481877")) return;
    member.addRole("411182426895679489");
    member.removeRole("444928878692139009");

    msg.react("✅");
    Client.embed.createEmbed(Client.log_channel, ":white_check_mark: Successfully unmuted " + member.user, "Unmuted");
}