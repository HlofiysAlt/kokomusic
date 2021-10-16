const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Перемешивает очерель",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["shuff"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Сейчас ничего не играет**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **В войс зайди**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Зайди ко мне в войс**");
        if (!player.queue || !player.queue.length || player.queue.length === 0) return client.sendTime(message.channel, "❌ | **Слишком мало песен в очереди**");
        player.queue.shuffle();
        await client.sendTime(message.channel, "✅ | Перемешал очередь");
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
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Зайди ко мне в войс**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction.channel, "❌ | **Сейчас ничего не играет**");
            if (!player.queue || !player.queue.length || player.queue.length === 0) return client.sendTime(interaction, "❌ | **Слишком мало песен в очереди**");
            player.queue.shuffle();
            client.sendTime(interaction, "✅ | Перемешал очередь");
        },
    },
};
