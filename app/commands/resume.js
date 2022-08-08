const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Şu anda çalmakta olan müziği devam ettir",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Şuanda çalan bir şey yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ Müzik durduruldu`).catch(console.error);
    }

    return message.reply("Sıra duraklatılmadı.").catch(console.error);
  }
};
