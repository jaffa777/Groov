const Discord = require("discord.js");
const fs = require('fs');

const readdir = require("util").promisify(require("fs").readdir);

const commandHandler = require("./core/commandHandler.js");
const SetUp = require("./core/SetUp.js");
const logger = require("./util/logger.js");
const commandlist = require("./util/commandList.js");

const config = JSON.parse(fs.readFileSync('json/config.json', 'utf8'));

class Support extends Discord.Client {
    constructor(options) {
        super(options);
        this.embed = require("./util/createEmbed.js");
        this.log = require("./util/logger.js");
        this.prefix = "s!";
        this.commands = new Discord.Collection();
        this.log_channel = null;
        this.webhook = null;
    }
}

const Client = new Support({ messageCacheMaxSize: 50, messageCacheLifetime: 500, messageSweepInterval: 500, disabledEvents: ['TYPING_START'] });

const init = async () => {
    await Client.login(config.TOKEN).then(Client.log.info("[Core] Successfully connected to Discord API"));
    await SetUp.run(Client);

    Client.webhook = new Discord.WebhookClient("450345181053583362", config.webhooks.logs);
    
    readdir("./commands/", (err, files) => {
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
        Client.log.info(`[+] - ${member.user.username} joined Groovy's server!`);    
        var guildlog = Client.embed.returnEmbed(`:white_check_mark: **${member.user.username}** joined Groovy's server!`, "Joined");
        Client.webhook.send({ embeds: [guildlog] });
    
        member.addRole("411182426895679489");
    });
    
    Client.on("guildMemberRemove", member => {
        Client.log.info(`[-] - ${member.user.username} left Groovy's server!`);
        var guildlog = Client.embed.returnEmbed(`:no_entry_sign: **${member.user.username}** left Groovy's server!`, "Left");
        Client.webhook.send({ embeds: [guildlog] });
    });
    
    Client.on('message', async msg => {
        await commandHandler.run(Client, await msg); 
    });
};

init();

process.on("unhandledRejection", error => logger.error(`unhandledRejection:\n${error.stack}`)).on("uncaughtException", error => logger.error(`uncaughtException:\n${error.stack}`)).on("error", error => logger.error(`Error:\n${error.stack}`)).on("warn", error => logger.error(`Warning:\n${error.stack}`));