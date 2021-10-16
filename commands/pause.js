const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "pause",
    description: "Пауза блять",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Ничего не играет**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **В войс зайди**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Зайди в тот же войс что и я**");
        if (player.paused) return client.sendTime(message.channel, "❌ | **Музыка уже на паузе**");
        player.pause(true);
        let embed = new MessageEmbed().setAuthor(`Поставил на паузу`, client.botconfig.IconURL).setColor(client.botconfig.EmbedColor).setDescription(`Напиши \`${GuildDB.prefix}resume\` чтобы продолжить воспроизведение`);
        await message.channel.send(embed);
        await message.react("✅");
    },

    SlashCommand: {
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

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **В войс зайди**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Зайди в тот же войс что и я**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "❌ | **Ничего не играет**");
            if (player.paused) return client.sendTime(interaction, "Музыка уже на паузе!");
            player.pause(true);
            client.sendTime(interaction, "**⏸ Поставил на паузу**");
        },
    },
};
