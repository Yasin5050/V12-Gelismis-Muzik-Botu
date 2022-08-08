const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Seçilen sıra numarasına atla",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Şuan: ${message.client.prefix}${module.exports.name} <Sıra Numarası>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Sıra yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`Sıra sadece ${queue.songs.length} Sırada`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ skipped ${args[0] - 1} songs`).catch(console.error);
  }
};
