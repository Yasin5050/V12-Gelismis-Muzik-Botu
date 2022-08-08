module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Botun ortalama pingini göster",
  execute(message) {
    message.reply(`📈 Ortalama Ping'im: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
