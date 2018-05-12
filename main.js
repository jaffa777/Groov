const Discord = require("discord.js");
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('json/config.json', 'utf8'));

class Support extends Discord.Client {
    constructor(options) {
        super(options);
        this.embed = require("./util/createEmbed.js");
        this.log = require("./util/logger.js");
        this.prefix = "s!";
        this.commands = new Discord.Collection();
        this.log_channel = null;
    }
}

const Client = new Support({ messageCacheMaxSize: 50, messageCacheLifetime: 3600, messageSweepInterval: 3600, disabledEvents: ['TYPING_START'] });

const init = async () => {
    await Client.login(config.TOKEN).then(Client.log.info("[Core] Successfully connected to Discord API"));
    await SetUp.run(Client, token);
    
    readdir("./bot/commands/", (err, files) => {
        if(err) Client.log.error("[Core] " + err);

        var jsfiles = files.filter(f => f.split(".").pop() === "js");
        var jsaliases = commandlist.list;
        var jsaliases_length = Object.keys(jsaliases).length;

        Client.log.info("[Core] " + jsfiles.length + " commands found!");
        Client.log.info("[Core] " + jsaliases_length + " aliases found!");

        Object.keys(jsaliases).forEach(a => {
            var cmd = require(`./commands/${jsaliases[a]}`);
            Client.commands.set(a, cmd);
        });

        Client.log.info("[Core] All aliases were added!");
        Client.log.info("[Core] All commands were loaded!");
    });

    Client.log_channel = Client.channels.get("411177077014790147");
    
    Client.log.info(`[Setup] The bot has started, with ${Client.users.size} users, in ${Client.channels.size} channels of ${Client.guilds.size} guilds.`);

    Client.on("guildMemberAdd", member => {
        console.log(`[+] - ${member.user.username} joined musicBot's server!`);    
        Embed.createEmbed(Client.log_channel, `:white_check_mark: **${member.user.username}** joined musicBot's server!`, "Joined");
    
        member.addRole("411182426895679489");
    });
    
    Client.on("guildMemberRemove", member => {
        console.log(`[-] - ${member.user.username} left musicBot's server!`);
        Embed.createEmbed(Client.log_channel, `:no_entry_sign: **${member.user.username}** left musicBot's server!`, "Left");
    });
    
    Client.on("guildUpdate", () => {
        const log_channel = Client.channels.get("411177077014790147");
    
        console.log(`[/] - The guild was edited!`);
        Embed.createEmbed(Client.log_channel, `:recycle: The guild was edited!`, "Edited");
    });
    
    Client.on("warn", warn => {
        const log_channel = Client.channels.get("411177077014790147");
    
        console.log(`[!] - WARNING: ${warn}!`);
        Embed.createEmbed(Client.log_channel, `:bangbang: WARNING: ${warn}!`, "Warning");
    });
    
    Client.on('message', async msg => {
        await commandHandler.run(Client, await msg); 
    });
};

init();

process.on("unhandledRejection", error => logger.error(`unhandledRejection:\n${error.stack}`)).on("uncaughtException", error => logger.error(`uncaughtException:\n${error.stack}`)).on("error", error => logger.error(`Error:\n${error.stack}`)).on("warn", error => logger.error(`Warning:\n${error.stack}`));