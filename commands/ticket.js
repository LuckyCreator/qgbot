const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const catagoryID = "726414717794386012";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {
        
        if(channel.name == username.toLowerCase() + "-" + userDiscriminator){
            ticketBestaat = true;

            message.reply("Je hebt al een bestaande ticket.");

            return;
        }

    });

    if(ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.userName)
        .setColor("#fc7703")
        .setFooter("Je ticket wordt aangemaakt.", "https://i.imgur.com/ypA0sc3.png");
    
    message.channel.send(embed);

    message.guild.channels.create(message.guild.userName.toLowerCase + "-" + userDiscriminator, {type: "text"}).then(
        (createdChannel) => {
            createdChannel.setParent(catagoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id,{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGES_HISTORY: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hoi ${message.author.username}`)
                        .setColor("#fc7703")
                        .setDescription("Stel hier je vraag en je zult zo spoedig mogelijk geholpen worden.")
                        .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png")

                    settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Er is iets fout gegaan!");
            });
        }
    ).catch(err => {
        message.channel.send("Er is iets fout gegaan!");
    });


}

module.exports.help = {
    name: "ticket"
}