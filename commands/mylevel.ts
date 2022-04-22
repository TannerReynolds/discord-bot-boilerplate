// @ts-ignore
const config: any = require("../config.js");
// @ts-ignore
const { settings }: any = require("../modules/settings.js");
exports.run = async (client: any, message: any, args: any, level: any) => {
  const friendly: any = config.permLevels.find((l: any) => l.level === level).name;
  const replying: any = settings.ensure(message.guild.id, config.defaultSettings).commandReply;
  message.reply({ content: `Your permission level is: ${level} - ${friendly}`, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Miscellaneous",
  description: "Tells you your permission level for the current message location.",
  usage: "mylevel"
};
