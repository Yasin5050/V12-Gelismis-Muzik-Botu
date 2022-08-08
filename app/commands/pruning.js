const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Bot mesajlarını aç/kapat",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Dosyaya yazılırken bir hata oluştu.").catch(console.error);
      }

      return message.channel
        .send(`Mesaj gönderme ${config.PRUNING ? "**Aktif**" : "**Kapat**"}`)
        .catch(console.error);
    });
  }
};
