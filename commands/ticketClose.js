const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const catagoryID = "726414717794386012";

    if(!message.member.hasPermission("KICK_MEMBER")) return message.reply("Jij kan dit helaas niet doen.");

    if(message.channel.parentID == catagoryID) {
        message.channel.delete();

        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setColor("#fc7703")
            .setDescription("De ticket is gemarkeerd als **Voltooid**")
            .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png")
    
        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log")
        if (!ticketChannel) return message.reply("Kanaal bestaat niet.");

        ticketChannel.send(embedCreateTicket);

    } else {
        message.channel.send("Dit command kan enkel in een ticket kanaal worden uitgevoerd.")
    }

}

module.exports.help = {
    name: "close"
}