const Discord = require('discord.js');

module.exports = {

    createEmbed(channel, content, title) {
        var message;
        var emb = new Discord.RichEmbed();
        
        emb.setDescription(content);
        emb.setColor(channel.guild.me.displayColor);
        emb.setTitle(title)
        
        channel.send(emb).then((m) => {
            message = m
        });

        return message;
    },

    returnEmbed(content, title) {
        var emb = new Discord.RichEmbed();
        
        emb.setDescription(content);
        emb.setTitle(title);

        return emb;
    }
}