const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "stop",
  description: "Müziği durdurur.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Çalan bi müzik yok!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ Müzik durduruldu!`).catch(console.error);
  }
};
