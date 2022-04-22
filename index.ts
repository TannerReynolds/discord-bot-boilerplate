// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.x or higher is required. Update Node on your system.");
require("dotenv").config();

// Load up the discord.js library
const { Client, Collection }: any = require("discord.js");
// We also load the rest of the things we need in this file:
const { readdirSync }: any = require("fs");
const { intents, partials, permLevels }: any = require("./config.js");
const logger: any = require("./modules/logger.js");
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're referring to. Your client.
const client: any = new Client({ intents, partials });

// Aliases, commands and slash commands are put in collections where they can be
// read from, catalogued, listed, etc.
const commands: any = new Collection();
const aliases: any = new Collection();
const slashcmds: any = new Collection();

// Generate a cache of client permissions for pretty perm names in commands.
const levelCache = {};
for (let i = 0; i < permLevels.length; i++) {
  const thisLevel: any = permLevels[i];
  levelCache[thisLevel.name] = thisLevel.level;
}

// To reduce client pollution we'll create a single container property
// that we can attach everything we need to.
client.container = {
  commands,
  aliases,
  slashcmds,
  levelCache
};

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init: Function = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const commands: any = readdirSync("./commands/").filter((file: string) => file.endsWith(".js"));
  for (const file of commands) {
    const props: any = require(`./commands/${file}`);
    logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias: any) => {
      client.container.aliases.set(alias, props.help.name);
    });
  }

  // Now we load any **slash** commands you may have in the ./slash directory.
  const slashFiles: any = readdirSync("./slash").filter((file: string) => file.endsWith(".js"));
  for (const file of slashFiles) {
    const command: any = require(`./slash/${file}`);
    const commandName: string = file.split(".")[0];
    logger.log(`Loading Slash command: ${commandName}. 👌`, "log");
    
    // Now set the name of the command with it's properties.
    client.container.slashcmds.set(command.commandData.name, command);
  }

  // Then we load events, which will include our message and ready event.
  const eventFiles: any = readdirSync("./events/").filter((file: string) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const eventName: string = file.split(".")[0];
    logger.log(`Loading Event: ${eventName}. 👌`, "log");
    const event: any = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  }  

  // Threads are currently in BETA.
  // This event will fire when a thread is created, if you want to expand
  // the logic, throw this in it's own event file like the rest.
  client.on("threadCreate", (thread: any[]) => thread.join());

  // Here we login the client.
  client.login();

// End top-level async/await function.
};

init();
