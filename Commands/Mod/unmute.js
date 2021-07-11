const { MessageEmbed } = module.require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute members in one shot",
  category: "moderation",
  usage: "=ummute <@user> <reason >",
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["EMBED_LINKS", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        `**${message.author.username}**, Please mention the member who you want to unmute`
      );
    }

    let muterole = message.guild.roles.cache.find((x) => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send(`Given User is not muted`);
    }
    user.roles.remove(muterole);

    const embed = new MessageEmbed()
      .setTitle("Unmute")
      .setColor("RANDOM")
      .setDescription(`User Unmuted: ${user} \nUnmuted by: ${message.member}`);
    message.channel.send({ embeds: [embed] });
  },
};
