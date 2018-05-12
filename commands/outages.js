const fs = require('fs');

module.exports.run = (Client, msg, args) => {
    var outages = msg.guild.channels.get("443132392211873802");
    var channel = msg.guild.channels.get("404312845602390017");
    var message = ":groovyrounded: No known issues as of now, report anything you encounter in " + channel;

    var emb = new Discord.RichEmbed();
    emb.setTitle("Operational");
    emb.setDescription(message);
    emb.setColor(msg.guild.me.displayColor);
    emb.setAuthor("Groovy Support", Client.user.avatarURL);
    emb.setFooter("Current outages", Client.user.avatarURL);

    const fetched = await outages.fetchMessages({limit: 99});
    outages.bulkDelete(fetched);

    outages.send(emb);

    Client.embed.createEmbed(msg.channel, ":white_check_mark: Successfully updated outages!", "Updated outages");
}