// @ts-ignore
const logger: any = require("../modules/logger.js");
// This event executes when a new guild (server) is joined.

module.exports = (client: any, guild: any) => {
  logger.log(`[GUILD JOIN] ${guild.id} added the bot. Owner: ${guild.ownerId}`);
};
