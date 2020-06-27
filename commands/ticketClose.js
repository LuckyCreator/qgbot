const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets");

    if(message.guild.me.hasPermission(`MANAGE_CHANNELS`) && !SupportCategory) {
        message.channel.delete();
    }

    if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`) && !SupportCategory) {
        message.guild.send("Sorry maar je hebt hier helaas geen rechten voor.")
    }

}

module.exports.help = {
    name: "close"
}