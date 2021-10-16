const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Очищает очередь",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Ебаный клоун, щас не играет ничего.**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(message.channel, "❌ | **В очереди пусто**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **В войс зайди, дэб**");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Зайди ко мне в войс сначала**");
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **Очистил очередь**");
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
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | В войс зайди, дэб");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Зайди ко мне в войс сначала**");
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(interaction, "❌ | **Ебаный клоун, щас не играет ничего**");

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(interaction, "❌ | **Ебаный клоун, щас не играет ничего**");
      player.queue.clear();
      await client.sendTime(interaction, "✅ | **Очистил очередь**");
    },
  },
};
