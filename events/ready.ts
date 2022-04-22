// @ts-ignore
const logger = require("../modules/logger.js");
// @ts-ignore
const { getSettings }: any = require("../modules/functions.js");
module.exports = async (client: any) => {
  // Log that the bot is online.
  logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.map((g: any) => g.memberCount).reduce((a: any, b: any) => a + b)} users in ${client.guilds.cache.size} servers.`, "ready");
  
  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${getSettings("default").prefix}help`, { type: "PLAYING" });
};
