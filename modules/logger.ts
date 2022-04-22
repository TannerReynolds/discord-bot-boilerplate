/*
Logger class for easy and aesthetically pleasing console logging 
*/
const { cyan, red, magenta, gray, yellow, white, green }: any = require("colorette");
const { Timestamp }: any = require("@sapphire/time-utilities");

exports.log = (content: any, type: string = "log") => {
  const timestamp: any = `[${cyan(new Timestamp("YYYY-MM-DD HH:mm:ss"))}]:`;
  
  switch (type) {
    case "log": return console.log(`${timestamp} ${gray(type.toUpperCase())} ${content} `);
    case "warn": return console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content} `);
    case "error": return console.log(`${timestamp} ${red(type.toUpperCase())} ${content} `);
    case "debug": return console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content} `);
    case "cmd": return console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`);
    case "ready": return console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`);
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
}; 

// @ts-ignore
exports.error = (...args) => this.log(...args, "error");
// @ts-ignore
exports.warn = (...args) => this.log(...args, "warn");
// @ts-ignore
exports.debug = (...args) => this.log(...args, "debug");
// @ts-ignore
exports.cmd = (...args) => this.log(...args, "cmd");
