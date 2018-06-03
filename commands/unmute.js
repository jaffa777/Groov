const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(!msg.member.roles.has("403973335521689601")) return;

    var member = msg.mentions.members.first();
    if(member.roles.has("403973188255481877")) return;
    member.addRole("411182426895679489");
    member.removeRole("444928878692139009");

    msg.delete();
    msg.channel.send(":white_check_mark: Successfully unmuted " + member.user).then(message => {
        setTimeout( () => {
            message.delete();
        }, 10000);
    });
    Client.embed.createEmbed(Client.log_channel, ":white_check_mark: Successfully unmuted " + member.user, "Unmuted");
}