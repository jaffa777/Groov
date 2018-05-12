const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = (Client, msg, args) => {
    var channel = msg.guild.channels.get("444896865616396300");

    var title;
    var message;
    var color;

    var status = args[0];

    switch(status) {
        case "operational":
        case "op":
        title = "Operational";
        message = ":white_check_mark: The bot is running without any problems!";
        color = "#33ce3b";
        break;

        case "updating":
        case "up":
        title = "Updating";
        message = ":recycle: The bot is currently updating! Please be patient!";
        color = "#3380ce";
        break;

        case "restarting":
        case "re":
        title = "Restarting";
        message = ":warning: The bot is currently restarting! Please be patient!";
        color = "#ffff44";
        break;

        case "offline":
        case "off":
        title = "Offline";
        message = ":red_circle: The bot is currently offline! We are working on that!";
        color = "#a3a3a3";
        break;

        default:
        return;
    }

    if(title && message && color) {
        var emb = new Discord.RichEmbed();
        emb.setTitle(title);
        emb.setDescription(message);
        emb.setColor(color);
        emb.setAuthor("Groovy Support", Client.user.avatarURL);
        emb.setFooter("Current status", Client.user.avatarURL);

        const fetched = await channel.fetchMessages({limit: 99});
        channel.bulkDelete(fetched);

        channel.send(emb);

        Client.embed.createEmbed(msg.channel, ":white_check_mark: Successfully changed the status!", "Changed status");
    }
}