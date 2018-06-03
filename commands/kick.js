const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(!msg.member.roles.has("403973335521689601")) return;

    var member = msg.mentions.members.first();
    if(!member.kickable) return;
    member.kick();

    msg.delete();
    msg.channel.send(":white_check_mark: Successfully kicked " + member.user).then(message => {
        setTimeout( () => {
            message.delete();
        }, 10000);
    });
    Client.embed.createEmbed(Client.log_channel, ":white_check_mark: Successfully kicked " + member.user, "Kicked successfully");
}