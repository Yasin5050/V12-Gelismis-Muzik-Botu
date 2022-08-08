const move = require("array-move");
const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Şarkıları kuyrukta hareket ettirin",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Çalan bir sıra yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Şuan: ${message.client.prefix}<Sıra Numarasını taşı>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Şuan: ${message.client.prefix}<Sıra Numarasını taşı>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      `${message.author} 🚚 Taşınıyor **${song.title}** artık ${args[1] == 1 ? 1 : args[1] - 1} sırada.`
    );
  }
};
