module.exports.run = async (Client) => {

    checkMember();
    setInterval( () => {
        checkMember();
    }, 600000);

    function checkMember() {
        var guild = Client.guilds.get("403882830225997825");
        var members = guild.members.array();

        members.forEach(async member => {
            if(!member.roles.has("411182426895679489")) {
                await member.addRole("411182426895679489");
            }
    
            if(member.roles.has("444928878692139009")) {
                await member.removeRole("444928878692139009");
            }
        });
    }
}