const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("**Informatie**")
        .setColor("#fc7703")
        .addFields(
            {name: "Server Naam:", value: "QuadGames | MC-Server"},
            {name: "Versie:", value: "1.8.8 t/m 1.15.2"},
            {name: "Status:", value: "Online!"}
        )
        .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png")
        .setThumbnail("https://i.imgur.com/ypA0sc3.png");

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info"
}