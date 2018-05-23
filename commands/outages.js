const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(msg.author.id != "254892085000405004") return;
    var outages = msg.guild.channels.get("443132392211873802");
    var channel = msg.guild.channels.get("404312845602390017");
    var message = ":white_check_mark: No known issues as of now, report anything you encounter in " + channel;

    if(!args[0]) {
        var emb = new Discord.RichEmbed();
        emb.setTitle("Operational");
        emb.setDescription(message);
        emb.setColor(msg.guild.me.displayColor);
        emb.setAuthor("Groovy Support", Client.user.avatarURL);
        emb.setFooter("Current outages");

        const fetched = await outages.fetchMessages({limit: 99});
        outages.bulkDelete(fetched);

        outages.send(emb);
    } else {
        var emb = new Discord.RichEmbed();
        emb.setTitle("Warning");
        emb.setDescription(args.join(" "));
        emb.setColor(msg.guild.me.displayColor);
        emb.setAuthor("Groovy Support", Client.user.avatarURL);
        emb.setFooter("Current outages");

        const fetched = await outages.fetchMessages({limit: 99});
        outages.bulkDelete(fetched);

        outages.send(emb);
    }

    msg.react("✅");
    Client.embed.createEmbed(msg.channel, ":white_check_mark: Successfully updated outages!", "Updated outages");
}