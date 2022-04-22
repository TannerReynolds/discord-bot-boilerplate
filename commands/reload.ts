// @ts-ignore
const config: any = require("../config.js");
// @ts-ignore
const { settings }: any = require("../modules/settings.js");
exports.run = async (client: any, message: any, args: any, level: any) => { // eslint-disable-line no-unused-vars
  // Grab the container from the client to reduce line length.
  const { container }: any = client;
  const replying: any = settings.ensure(message.guild.id, config.defaultSettings).commandReply;
  if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const command: any = container.commands.get(args[0]) || container.commands.get(container.aliases.get(args[0]));
  // Check if the command exists and is valid
  if (!command) {
    return message.reply("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${command.help.name}.js`)];
  // We also need to delete and reload the command from the container.commands Enmap
  container.commands.delete(command.help.name);
  const props: any = require(`./${command.help.name}.js`);
  container.commands.set(command.help.name, props);

  message.reply({ content: `The command \`${command.help.name}\` has been reloaded`, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that\"s been modified.",
  usage: "reload [command]"
};