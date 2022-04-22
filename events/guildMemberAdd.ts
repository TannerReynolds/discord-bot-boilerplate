// @ts-ignore
const { getSettings }: any = require("../modules/functions.js");
// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client: any, member: any) => {
  // Load the guild's settings
  const settings: any = getSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage: any = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.cache.find((c: any) => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
