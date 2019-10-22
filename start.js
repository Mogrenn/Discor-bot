const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
let bot_token = "NjM2MTQ4ODIzMzg2ODgyMDQ5.Xa7Z5w.Wk2gXg544hWDEv7iWP1-h155ZGc";

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
});

client.on('message', (msg) => {
  if (msg.author == client.user) { // Prevent bot from responding to its own messages
    return
  }

  if (msg.content.startsWith("!")) {
    processCommand(msg);
  }
})

function processCommand(msg) {
  let fullCommand = msg.content.substr(1); // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

  console.log("Command received: " + primaryCommand);
  console.log("Arguments: " + arguments); // There may not be any arguments

  switch (primaryCommand) {
    case "help":
      helpCommand(arguments, msg);
      break;

    case "op":
      op(arguments, msg);
      break;
    default:

  }
}

function helpCommand(arguments, msg) {
  if (arguments.length > 0) {
    msg.channel.send("Är det detta kommand du vill ha hjälp med " + arguments);
  } else {
    msg.channel.send("Fuck you");
  }
}

function op(arguments, msg) {
  let uname = "";
  for(let i = 1; i < arguments.length; i++){
    if(i === 1 ){
        uname += arguments[i];
    }else{
    uname += "+"+arguments[i];
    }

  }

  if (arguments.length < 0) {
    msg.channel.send("För lite argument(exmpel: !op )");
  } else {

    switch (arguments[0]) {
      case "euw":

        msg.channel.send("https://euw.op.gg/summoner/userName=" + uname);
        break;
      case "na":
        msg.channel.send("https://na.op.gg/summoner/userName=" + uname);
        break;
      case "eune":
        msg.channel.send("https://eune.op.gg/summoner/userName=" + uname);
        break;
      default:
        msg.channel.send("You stupid or what support för wildcard regions endast");
    }

  }

}


client.login(bot_token);