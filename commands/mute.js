const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(!msg.member.roles.has("403973335521689601")) return;

    var member = msg.mentions.members.first();
    if(member.roles.has("403973188255481877")) return;

    if(!args[1]) {
        mute(member);
    } else {
        var times = args[1].split(":");

        if(times.length == 1) {
            var time;
            time = parseInt(times[0]) * 60 * 1000;

            mute(member);
            setTimeout( () => {
                unmute(member);
            }, time);
        } else if(times.length == 2) {
            var time;
            time = parseInt(times[0]) * 60 * 60 * 1000;
            time = time + parseInt(times[1]) * 60 * 1000;
            
            mute(member);
            setTimeout( () => {
                unmute(member);
            }, time);
        } else if(times.length == 3) {
            var time;
            time = parseInt(times[1]) * 24 * 60 * 60 * 1000;
            time = time + parseInt(times[1]) * 60 * 60 * 1000;
            time = time + parseInt(times[2]) * 60 * 1000;
            
            mute(member);
            setTimeout( () => {
                unmute(member);
            }, time);
        } else {
            return;
        }
    }

    msg.delete();
    msg.channel.send(":white_check_mark: Successfully muted " + member.user).then(message => {
        setTimeout( () => {
            message.delete();
        }, 10000);
    });
    Client.embed.createEmbed(Client.log_channel, ":white_check_mark: Successfully muted " + member.user, "Muted");

    function mute(m) {
        m.removeRole("411182426895679489");
        m.addRole("444928878692139009");
    }

    function unmute(m) {
        m.removeRole("444928878692139009");
        m.addRole("411182426895679489");
    }
}