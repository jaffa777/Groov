const { RichEmbed } = require('discord.js')

module.exports = {
    createEmbed(channel, content, title, front) {
        var message;
        var emb = new RichEmbed();

        var fronts = "";

        if(front) {
            fronts = "@everyone";
        }

        emb.setDescription(content);
        emb.setColor(channel.guild.me.displayColor);
        emb.setTitle(title);

        channel.send(fronts, emb).then((m) => {
            message = m
        })
        return message
    }
}