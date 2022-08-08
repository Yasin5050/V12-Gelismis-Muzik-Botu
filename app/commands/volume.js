const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Şu anda çalmakta olan müziğin sesini değiştir",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Çalan herhangi bi müzik yok!").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Önce bir ses kanalına katılman gerekiyor!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Mevcut ses: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Lütfen ses seviyesini ayarlamak için bir sayı kullanın.").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("Lütfen arasında bir sayı kullanın 0 - 200.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 200);

    return queue.textChannel.send(`Ses düzeyi olarak ayarlandı: **${args[0]}%**`).catch(console.error);
  }
};
