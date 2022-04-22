// @ts-ignore
const { version }: any = require("discord.js");
// @ts-ignore
const { codeBlock }: any = require("@discordjs/builders");
// @ts-ignore
const { DurationFormatter }: any = require("@sapphire/time-utilities");
// @ts-ignore
const durationFormatter: any = new DurationFormatter();

exports.run = async (client: any, interaction: any) => { // eslint-disable-line no-unused-vars
  const duration = durationFormatter.format(client.uptime);
  const stats = codeBlock("asciidoc", `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.guilds.cache.map((g: any) => g.memberCount).reduce((a: any, b: any) => a + b).toLocaleString()}
• Servers    :: ${client.guilds.cache.size.toLocaleString()}
• Channels   :: ${client.channels.cache.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`);
  await interaction.reply(stats);
};

exports.commandData = {
  name: "stats",
  description: "Show's the bots stats.",
  options: [],
  defaultPermission: true,
};

// Set guildOnly to true if you want it to be available on guilds only.
// Otherwise false is global.
exports.conf = {
  permLevel: "User",
  guildOnly: false
};