// @ts-ignore
const config: any = require("../config.js");
// @ts-ignore
const { settings }: any = require("../modules/settings.js");
exports.run = async (client: any, message: any, args: any, level: any) => { // eslint-disable-line no-unused-vars
  const replying: any = settings.ensure(message.guild.id, config.defaultSettings).commandReply;
  await message.reply({ content: "Bot is shutting down.", allowedMentions: { repliedUser: (replying === "true") }});
  await Promise.all(client.container.commands.map((cmd: any) => {
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${cmd.help.name}.js`)];
    // We also need to delete and reload the command from the container.commands Enmap
    client.container.commands.delete(cmd.help.name);
  }));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};
