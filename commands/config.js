const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "config",
  description: "Настроить бота",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["cfg"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Config = new MessageEmbed()
      .setAuthor("Сервер конфиг", client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .addField("Префикс", GuildDB.prefix, true)
      .addField("DJ роль", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Не установлен", true)
      .setDescription(`
Че менять?

:one: - Префикс на сервере
:two: - DJ Роль
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("1️⃣");
    await ConfigMessage.react("2️⃣");
    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      client.sendTime(
        message.channel, "❌ | **Сука, думай быстрее**"
      );
      ConfigMessage.delete(Config);
    });
    let isOk = false;
    try {
      emoji = emoji.first();
    } catch {
      isOk = true;
    }
    if (isOk) return; //im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "1️⃣") {
      await client.sendTime(message.channel, "Какой Префикс поставить??");
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first())
        return client.sendTime(message.channel, "Быстрее думай в следующий раз");
      prefix = prefix.first();
      prefix = prefix.content;

      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      client.sendTime(
        message.channel, `Поставил префикс \`${prefix}\``
      );
    } else {
      await client.sendTime(
        message.channel, "Пингани роль, которую ты хочешь сделать диджейной."
      );
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first())
        return client.sendTime(message.channel, "Быстрее думай в следующий раз");
      role = role.first();
      if (!role.mentions.roles.first())
        return client.sendTime(
          message.channel, "Пингани роль, которую ты хочешь сделать только диджейной."
        );
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      client.sendTime(
        message.channel, "Успешно сохранил диджейную роль как <@&" + role.id + ">"
      );
    }
  },

  SlashCommand: {
    options: [
      {
        name: "префикс",
        description: "показывает префикс бота",
        type: 1,
        required: false,
        options: [
          {
            name: "символ",
            description: "устанавливает префикс бота",
            type: 3,
            required: false,
          },
        ],
      },
      {
        name: "dj",
        description: "Показывает DJ роль",
        type: 1,
        required: false,
        options: [
          {
            name: "роль",
            description: "Устанавливает DJ роль",
            type: 8,
            required: false,
          },
        ],
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
      let config = interaction.data.options[0].name;
      let member = await interaction.guild.members.fetch(interaction.user_id);
      //TODO: if no admin perms return...
      if (config === "prefix") {
        //prefix stuff
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          //has prefix
          let prefix = interaction.data.options[0].options[0].value;
          await client.database.guild.set(interaction.guild.id, {
            prefix: prefix,
            DJ: GuildDB.DJ,
          });
          client.sendTime(interaction, `Поставил префикс \`${prefix}\``);
        } else {
          //has not prefix
          client.sendTime(interaction, `Префикс сервера: \`${GuildDB.prefix}\``);
        }
      } else if (config === "djrole") {
        //DJ role
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          let role = interaction.guild.roles.cache.get(
            interaction.data.options[0].options[0].value
          );
          await client.database.guild.set(interaction.guild.id, {
            prefix: GuildDB.prefix,
            DJ: role.id,
          });
          client.sendTime(
            interaction, `Успешно сохранил имя диджейной роли как ${role.name}`
          );
        } else {
          /**
           * @type {require("discord.js").Role}
           */
          let role = interaction.guild.roles.cache.get(GuildDB.DJ);
          client.sendTime(interaction, `DJ роль этого сервера ${role.name}`);
        }
      }
    },
  },
};
