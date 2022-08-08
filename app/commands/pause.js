const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "pause",
  description: "Çalmakta olan müziği duraklat",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Oynayan bir şey yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ müziği duraklattı.`).catch(console.error);
    }
  }
};
