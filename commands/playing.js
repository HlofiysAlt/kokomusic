const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "playing",
  description: "Посмотреть что сейчас играет",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["си", "сг", "pg"],
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
        "❌ | **Ебаный клоун, щас не играет ничего**"
      );

    let song = player.queue.current;
    let QueueEmbed = new MessageEmbed()
      .setAuthor("Сейчас играет", client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .setDescription(`[${song.title}](${song.uri})`)
      .addField("Запрошено", `${song.requester}`, true)
      .addField(
        "Длительность",
        `${
          client.ProgressBar(player.position, player.queue.current.duration, 15)
            .Bar
        } \`${prettyMilliseconds(player.position, {
          colonNotation: true,
        })} / ${prettyMilliseconds(player.queue.current.duration, {
          colonNotation: true,
        })}\``
      )
      .setThumbnail(player.queue.current.displayThumbnail());
    return message.channel.send(QueueEmbed);
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
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Ебаный клоун, щас не играет ничего**"
        );

      let song = player.queue.current;
      let QueueEmbed = new MessageEmbed()
        .setAuthor("Сейчас играет", client.botconfig.IconURL)
        .setColor(client.botconfig.EmbedColor)
        .setDescription(`[${song.title}](${song.uri})`)
        .addField("Запрошено", `${song.requester}`, true)
        .addField(
          "Длительность",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`${prettyMilliseconds(player.position, {
            colonNotation: true,
          })} / ${prettyMilliseconds(player.queue.current.duration, {
            colonNotation: true,
          })}\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
      return interaction.send(QueueEmbed);
    },
  },
};