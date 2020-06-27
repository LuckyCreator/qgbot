const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    
    const reason = message.content.split(" ").slice(1).join(" ");

    let SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets");

    if(message.guild.me.hasPermission(`MANAGE_CHANNELS`) && !SupportCategory) {
        SupportCategory = await message.guild.channels.create(`Tickets`, {
            type: "category",
        });
    };

    if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`) && !SupportCategory) {
        message.guild.send("Sorry maar je hebt hier helaas geen rechten voor.")
    }

    if(!message.guild.roles.cache.find(role => role.name === "Support Team")) {
        await (message.guild.roles.create({
            name: `Support Team`,
            color: `YELLOW`,
        }));
    };

    let supportrole = message.guild.roles.cache.find(role => role.name === "Support Team")

    if(!supportrole) {
        return message.channel.send("Sorry er is wat mis gegaan. Vraag AlwaysLucky_#2666 voor hulp!")
    }

    if(!reason) {
        return message.channel.send("Geef een reden op om een ticket aan te kunnen maken.")
    }

    const channelName = `ticket-${message.author.id}`
    if(message.guild.channels.cache.find(channel => channel.name === `ticket-<@${message.author.username.toLowerCase()}>`)) {
        return message.channel.send("Sorry maar je hebt al een lopende ticket.")
    }

    message.guild.channels.create(channelName, { parent: SupportCategory.id, topic: `Ticket Owner: <@${message.author.id}>`}).then(c => {
        const sr = message.guild.roles.cache.get(supportrole)
        const everyone = message.guild.roles.cache.find(role => role.name === `@everyone`)
        c.updateOverwrite(sr, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        c.updateOverwrite(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
        });
        let CreatedTicketEmbed = new discord.MessageEmbed()
            .setColor("#fc7703")
            .setTitle("Nieuw Support Ticket")
            .setDescription(`<@${message.author.id}> Je support ticket kanaal is <#${c.id}>`)
            .setTimestamp()
            .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png")
        message.channel.send(CreatedTicketEmbed)
        let GreetEmbed = new discord.MessageEmbed()
            .setColor("#fc7703")
            .addField(`Nieuw Support Ticket`, `<@${message.auhtor.id}> Bedankt voor het aanmaken van een ticket. Je wordt zo spoedig mogelijk geholpen.`)
            .addField(`Probleem:`, reason)
            .setTimestamp()
            .setFooter("play.quadgames.ga | QuadGames", "https://i.imgur.com/ypA0sc3.png")
        c.channel.send(GreetEmbed)

    }).catch(console.error);


}

module.exports.help = {
    name: "ticket"
}