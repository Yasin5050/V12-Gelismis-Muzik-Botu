const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Şu anda çalmakta olan şarkıyı atla",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("Senin için atlayabileceğim hiçbir şarkı yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ Şarkıyı geçtim!`).catch(console.error);
  }
};
