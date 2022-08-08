const { canModifyQueue } = require("../util/ZivobotUtil");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Müzik döngüsünü aç/kapat",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Oynayan bir şey yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(`Döngü şimdi${queue.loop ? "**Açık**" : "**Kapalı**"}`).catch(console.error);
  }
};
