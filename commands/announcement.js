const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)) return message.reply("Sorry jij mag dit helaas niet.");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("**Gebruik**")
            .setColor("#fc7703")
            .setDescription(`Maak een announcement doormiddel van \n !announcement titel ${seperator} bericht ${seperator} kanaal`)
            .setTimeStamp()
            .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png");
        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if(argsList[2] === undefined) argsList[2] = "📌│updates";

    var options = {
        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud opgegeven.",
        kanaal: argsList[2].trim()

    }

    var announceEmbed = discord.MessageEmbed()
        .setTitle("**MEDEDELING**")
        .setColor("#fc7703")
        .setDescription(`Bericht van ${message.author} \n\n ${options.titel} \n ${options.bericht}`)
        .setTimeStamp()
        .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png");
    
    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("Dit kanaal bestaat niet.")

    channel.send(announceEmbed);
    


}

module.exports.help = {
    name: "announcement"
}