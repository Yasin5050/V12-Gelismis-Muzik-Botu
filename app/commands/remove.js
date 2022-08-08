const { canModifyQueue } = require("../util/ZivobotUtil");

const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Şarkıyı kuyruktan kaldır",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Sıra yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Şuan: ${message.client.prefix}kaldırmak <Sıra Numarası>`);

    const arguments = args.join("");
    const songs = arguments.split(",").map((str) => str.trim());
    let removed = [];

    if (pattern.test(arguments) && songs.every((value) => value < queue.songs.length)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.every((value) => value - 1 != index)) {
          return true;
        } else {
          removed.push(item);
        }
      });

      queue.textChannel.send(
        `${message.author} ❌ Kaldırıldı **${removed.map((song) => song.title).join("\n")}** kuyruktan.`
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] < queue.songs.length) {
      return queue.textChannel.send(
        `${message.author} ❌ Kaldırıldı **${queue.songs.splice(args[0] - 1, 1)[0].title}** kuyruktan.`
      );
    } else {
      return message.reply(`Şuan: ${message.client.prefix}kaldırılacak <Sıra Numarası>`);
    }
  }
};
