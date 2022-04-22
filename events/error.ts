// @ts-ignore
const logger: any = require("../modules/logger.js");
module.exports = async (client: any, error: any) => {
  logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
