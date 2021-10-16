const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leave",
  description: "Вырубаю музыку и ливаю",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ливни", "лив", "выйди", "стоп", "ст", "идинахуй"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **В войс зайди, дэб**");
    if (!player) return client.sendTime(message.channel,"❌ | **Ебаный клоун, щас не играет ничего**");
    await client.sendTime(message.channel,":notes: | **Ливнул**");
    await message.react("✅");
    player.destroy();
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **В войс зайди, дэб**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **Зайди в ${guild.me.voice.channel} чтобы использовать эту команду**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Ебаный клоун, щас не играет ничего**"
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":notes: | **Ливнул**"
      );
    },
  },
};
