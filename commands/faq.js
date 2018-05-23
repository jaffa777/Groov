const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (Client, msg, args) => {
    if(msg.author.id != "254892085000405004") return;
    var channel = msg.guild.channels.get("444978589692067860");
    var message = "Q: This bot is amazing! How can I support the devs?\nA: You can check out patreon: https://patreon.com/rxsto :heart:\n\nQ: I like this bot very much! Can I support the devs without donating?\nA: Sure! You could vote for Groovy here: https://rxsto.github.io/Groovy/vote :heart:\n\nQ: The music is lagging! What’s the problem?\nA: Check your connection to Discord!\n\nQ: The music is lagging although my connection to Discord is good?!\nA: We’re sorry for this inconvenience but our server is not strong enough to handle all these requests! Donating would help us a lot!\n\nQ: Groovy stopped playing randomly, what can I do?\nA: It might be a bug, so please report it to Groovys official server, but first try reconnecting yourself and reconnecting the bot.\n\nQ: The bot says that I need a specific role to use a specific command?\nA: The DJ-Mode is activated, that means only specific members can use specific commands!\n\nQ: Groovy says that I’m not registered as a patron while trying to use specific command?\nA: You should consider donating in case you want to use that command!\n\nQ: Something weird happened?! What can I do?\nA: Describe your problem in the official server of Groovy and let us fix the problem!";

    var emb = new Discord.RichEmbed();
    emb.setTitle("FAQ");
    emb.setDescription(message);
    emb.setColor(msg.guild.me.displayColor);
    emb.setAuthor("Groovy Support", Client.user.avatarURL);
    emb.setFooter("Frequently Asked Questions");

    const fetched = await channel.fetchMessages({limit: 99});
    channel.bulkDelete(fetched);

    channel.send(emb);

    Client.embed.createEmbed(msg.channel, ":white_check_mark: Successfully updated FAQs!", "Updated FAQs");
}