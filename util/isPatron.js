const fs = require("fs");

exports.run = (Client, Embed, guild, role, id, msg) => {

    texts = JSON.parse(fs.readFileSync( "./bot/json/lang/" + guild.language + ".json", 'utf8'));

    var to_return = false;

    if(Client.guilds.get("403882830225997825").members.has(id)) {
        var member = Client.guilds.get("403882830225997825").members.get(id);
        var roles = member.roles;

        if(roles.find("name", role) || roles.find("name", "Friend")) {
            to_return = true;
        } else {
            to_return = false;
        }
    } else {
        to_return = false;
    }
    
    return to_return;
}