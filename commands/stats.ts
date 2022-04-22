// @ts-ignore
const { version } = require("discord.js");
// @ts-ignore
const { codeBlock } = require("@discordjs/builders");
// @ts-ignore
const { DurationFormatter } = require("@sapphire/time-utilities");
// @ts-ignore
const durationFormatter = new DurationFormatter();

exports.run = (client: any, message: any, args: any, level: any) => { // eslint-disable-line no-unused-vars
  const duration: any = durationFormatter.format(client.uptime);
  const stats: any = codeBlock("asciidoc", `= STATISTICS =
  • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Uptime     :: ${duration}
  • Users      :: ${client.guilds.cache.map((g: any) => g.memberCount).reduce((a: any, b: any) => a + b).toLocaleString()}
  • Servers    :: ${client.guilds.cache.size.toLocaleString()}
  • Channels   :: ${client.channels.cache.size.toLocaleString()}
  • Discord.js :: v${version}
  • Node       :: ${process.version}`);
  message.channel.send(stats);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Miscellaneous",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
