const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Помощь по боту",
  usage: "[команда]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["команда", "команды", "кмд"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `Команды ${client.user.username}`,
              client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
              `Чтобы получить инфу по команде пиши ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }help [команда] | Члены лучше всех!`
            ).setDescription(`${Commands.join("\n")}
  
  Кокоджамюа мьюзик версии: v${require("../package.json").version}
  [GitHub](https://github.com/1Hlofiys/Kokodzhamba-bot) | By [Hlofiys](https://github.com/1Hlofiys) | [Сайт](https://kokodzhambamusic.herokuapp.com)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | Нет такой команды`);

      let embed = new MessageEmbed()
        .setAuthor(`Команда: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Вариации", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Использование",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Права",
          "Участник: " +
            cmd.permissions.member.join(", ") +
            "\nБот: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Префикс - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "команда",
        description: "получить инфу о команде",
        value: "команда",
        type: 3,
        required: false
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
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `Команды ${client.user.username}`,
              client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
              `Чтобы получить инфу о команде ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }хелп [Команда] | Члены лучше всех!`
            ).setDescription(`${Commands.join("\n")}
  
  Кокоджамюа мьюзик версии: v${require("../package.json").version}
  [GitHub](https://github.com/1Hlofiys/Kokodzhamba-bot) | By [Hlofiys](https://github.com/1Hlofiys) | [Сайт](https://kokodzhambamusic.herokuapp.com)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | Нет такой команды`);
  
        let embed = new MessageEmbed()
          .setAuthor(`Команда: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Вариации", cmd.aliases.join(", "), true)
          .addField(
            "Использование",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Права",
            "Участник: " +
              cmd.permissions.member.join(", ") +
              "\nБот: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Префикс - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};
