const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
    none: 0.0,
    low: 1,
    medium: 1.35,
    high: 2.5,
};
module.exports = {
    name: "bassboost",
    description: "Бассбустит ваше ебало",
    usage: "<none|low|medium|high>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["bb", "bass"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {

        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Ебаный клоун, щас не играет ничего**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **В войс зайди, дэб**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Зайди ко мне в войс сначала**");

        if (!args[0]) return client.sendTime(message.channel, "**А на сколько бассбустить?. \nДоступные уровни резни:** `none`, `low`, `medium`, `high`"); //if the user do not provide args [arguments]

        let level = "none";
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

        return client.sendTime(message.channel, `✅ | **Уровень *резни* был установлен на** \`${level}\``);
    },
    SlashCommand: {
        options: [
            {
                name: "уровень",
                description: `Укажи уровень резни. Доступные уровни: low, medium, high, или none`,
                value: "[level]",
                type: 3,
                required: true,
            },
        ],
        /**
         *
         * @param {import("../structures/DiscordMusicBot")} client
         * @param {import("discord.js").Message} message
         * @param {string[]} args
         * @param {*} param3
         */

        run: async (client, interaction, args, { GuildDB }) => {
            const levels = {
                none: 0.0,
                low: 1,
                medium: 1.35,
                high: 2.5,
            };

            let player = await client.Manager.get(interaction.guild_id);
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            if (!player) return client.sendTime(interaction, "❌ | **Ебаный клоун, щас не играет ничего**");
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **В войс зайди, дэб**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, ":x: | **Зайди ко мне в войс сначала**");
            if (!args) return client.sendTime(interaction, "**А на сколько бассбустить?. \nДоступные уровни резни:** `none`, `low`, `medium`, `high`"); //if the user do not provide args [arguments]

            let level = "none";
            if (args.length && args[0].value in levels) level = args[0].value;

            player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

            return client.sendTime(interaction, `✅ | **Уровень *резни* был установлен на** \`${level}\``);
        },
    },
};
