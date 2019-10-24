const Discord = require("./node_modules/discord.js");
const mysql = require("mysql");
let con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "",
  database: "rodret"
});
let sql = "select token from api where ID=1";
const client = new Discord.Client();
let mainChannel;
let bot_token;
getToken();



client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
  console.log("Server : ");
  mainChannel = client.channels.get("636292442781515792");

  client.guilds.forEach((guild) => {
    console.log(`-- ${guild.name} - ${guild.id}`);
    console.log("Channels : ");
    guild.channels.forEach((channel) => {
      console.log(`-- ${channel.name} (${channel.type} - ${channel.id})`);
    });
  });
});

client.on('message', (msg) => {
  if (msg.author == client.user) { // Prevent bot from responding to its own messages
    return
  }

  client.on("error", (error) => {
      console.log(error);
  });

  if (msg.content.startsWith("!")) {
    processCommand(msg);
  }
});

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

function op(arguments) {
  let uname = "";
  for (let i = 1; i < arguments.length; i++) {
    if (i === 1) {
      uname += arguments[i];
    } else {
      uname += "+" + arguments[i];
    }
  }

  if (arguments.length < 0) {
    mainChannel.send("För lite argument(exmpel: !op )");
  } else {

    switch (arguments[0]) {
      case "euw":
        mainChannel.send("https://euw.op.gg/summoner/userName=" + uname);
        break;
      case "na":
        mainChannel.send("https://na.op.gg/summoner/userName=" + uname);
        break;
      case "eune":
        mainChannel.send("https://eune.op.gg/summoner/userName=" + uname);
        break;
      default:
        mainChannel.send("You stupid or what support för wildcard regions endast");
    }
  }
}

function getToken(){
  con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT token FROM api where ID=1", function (err, response) {
  if (err) throw err;
  bot_token = response[0].token;
  client.login(bot_token);
  });
  });
}
