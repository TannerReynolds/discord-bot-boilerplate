/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

// @ts-ignore
const { codeBlock }: any = require("@discordjs/builders");
// @ts-ignore
const { toProperCase }: any = require("../modules/functions.js");

exports.run = (client: any, message: any, args: any, level: any) => {
  // Grab the container from the client to reduce line length.
  const { container }: any = client;
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
    const settings: any = message.settings;
      
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands: any = message.guild ? container.commands.filter((cmd: any) => container.levelCache[cmd.conf.permLevel] <= level) :
      container.commands.filter((cmd: any) => container.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);

    // Then we will filter the myCommands collection again to get the enabled commands.
    const enabledCommands: any = myCommands.filter((cmd: any) => cmd.conf.enabled);

    // Here we have to get the command names only, and we use that array to get the longest name.
    const commandNames: any = [...enabledCommands.keys()];

    // This make the help commands "aligned" in the output.
    const longest: any = commandNames.reduce((long: any, str: any) => Math.max(long, str.length), 0);

    let currentCategory: any = "";
    let output: string = `= Command List =\n[Use ${settings.prefix}help <commandname> for details]\n`;
    const sorted: any = enabledCommands.sort((p: any, c: any) => p.help.category > c.help.category ? 1 : 
      p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

    sorted.forEach((c: any) => {
      const cat: string = toProperCase(c.help.category);
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(codeBlock("asciidoc", output));

  } else {
    // Show individual command's help.
    let command: any = args[0];
    if (container.commands.has(command) || container.commands.has(container.aliases.get(command))) {
      command = container.commands.get(command) ?? container.commands.get(container.aliases.get(command));
      if (level < container.levelCache[command.conf.permLevel]) return;
      message.channel.send(codeBlock("asciidoc", `= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}`));
    } else return message.channel.send("No command with that name, or alias exists.");
  }};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
