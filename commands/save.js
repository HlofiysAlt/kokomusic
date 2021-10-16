const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "save",
  description: "Сохраняет песню в твою личку",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save"],
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
   message.author.send(new MessageEmbed()
   .setAuthor(`Песня сохранена`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor(client.botconfig.EmbedColor)
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`⌛ Длительность: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
  .addField(`🎵 Автор: `, `\`${player.queue.current.author}\``, true)
  .addField(`▶ Воспроизвезти:`, `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 Сохранил в:`, `<#${message.channel.id}>`)
  .setFooter(`Запрошено: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: Личку открой блять**")
    })    

    client.sendTime(message.channel, "✅ | **Чек лс**")
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
    const user = client.users.cache.get(interaction.member.user.id);
    const member = guild.members.cache.get(interaction.member.user.id);
    let player = await client.Manager.get(interaction.guild_id);
    if (!player) return client.sendTime(interaction, "❌ | **Ебаный клоун, щас не играет ничего**");
    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **В войс зайди, дэб**");
    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Зайди ко мне в войс сначала**");
    try{
    let embed = new MessageEmbed()
      .setAuthor(`Песня сохранена: `, client.user.displayAvatarURL())
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor(client.botconfig.EmbedColor)
      .setTimestamp()
      .setTitle(`**${player.queue.current.title}**`)
      .addField(`⌛ Длительность: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
      .addField(`🎵 Автор: `, `\`${player.queue.current.author}\``, true)
      .addField(`▶ Воспроизвезти:`, `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }play ${player.queue.current.uri}\``)
      .addField(`🔎 Сохранил в:`, `<#${interaction.channel_id}>`)
      .setFooter(`Запрошено: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      }))
      user.send(embed);
    }catch(e) {
      return client.sendTime(interaction, "**:x: Личку открой блять**")
    }

    client.sendTime(interaction, "✅ | **Чек лс**")
  },
  },
};
