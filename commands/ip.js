const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("Server IP: play.quadgames.ga");
}

module.exports.help = {
    name: "ip"
}