const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "youtube",
    description: "Запускает сессию Ютуб Тогезер",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["yt"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {require("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **В войс зайди**");
        if(!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE"))return client.sendTime(message.channel, "❌ | **У меня нет прав на приглашение**");

        let Invite = await message.member.voice.channel.activityInvite("755600276941176913")//Made using discordjs-activity package
        let embed = new MessageEmbed()
        .setAuthor("YouTube Together", "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1")
        .setColor("#FF0000")
        .setDescription(`
        Используя **Ютуб тогезер** ты можешь смотреть ютуб в войсе вместе. Кликни *Присоедениться к Ютуб Тогезер* чтобы зайти в него

__**[Присоедениться к Ютуб Тогезер](https://discord.com/invite/${Invite.code})**__

⚠ **Внимание:** Работает только на пк
`)
        message.channel.send(embed)
    },
    SlashCommand: {
        options: [
        ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | В войс зайди");
            if(!member.voice.channel.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"))return client.sendTime(interaction, "❌ | **У меня нет прав на приглашение**");

            let Invite = await member.voice.channel.activityInvite("755600276941176913")//Made using discordjs-activity package
            let embed = new MessageEmbed()
            .setAuthor("Ютуб тогезер", "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1")
            .setColor("#FF0000")
            .setDescription(`
Используя **Ютуб тогезер** ты можешь смотреть ютуб в войсе вместе. Кликни *Присоедениться к Ютуб Тогезер* чтобы зайти в него

__**[Присоедениться к Ютуб Тогезер](https://discord.com/invite/${Invite.code})**__

⚠ **Внимание:** Работает только на пк
`)
            interaction.send(embed.toJSON())
        },
    },
};
