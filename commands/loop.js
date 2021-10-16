const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "loop",
    description: "луп",
    usage: "",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["l", "повторять"],
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

        if (player.trackRepeat) {
          player.setTrackRepeat(false)
          client.sendTime(message.channel, `🔂  \`Выключен\``);
        } else {
          player.setTrackRepeat(true)
          client.sendTime(message.channel, `🔂 \`Включен\``);
        }
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
          const voiceChannel = member.voice.channel;
          let player = await client.Manager.get(interaction.guild_id);
          if (!player) return client.sendTime(interaction, "❌ | **Сейчас ничего не играет**"); 
          if (!member.voice.channel) return client.sendTime(interaction, "❌ | В войс зайди");
          if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Зайди ко мне в войс**");

            if(player.trackRepeat){
                  player.setTrackRepeat(false)
                  client.sendTime(interaction, `🔂 \`Выключен\``);
              }else{
                  player.setTrackRepeat(true)
                  client.sendTime(interaction, `🔂 \`Включен\``);
              }
          console.log(interaction.data)
        }
      }    
};