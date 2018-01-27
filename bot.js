//
// Modules
//
var Discord = require("discord.io");
var async = require("async");
var merge = require("merge");
var commandLineArgs = require("command-line-args");

//
// Command-line arguments
//
GLOBAL.options = commandLineArgs([

]);

//
// Logger
//
GLOBAL.logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true,
	timestamp: true
});
logger.level = "debug";

//
// Initilize libs
//
GLOBAL.libs = {};
async.parallel({
	commands: require("./commands.js"),
	utils: require("./utils.js")
}, function (err, results) {
	libs = merge(results, libs);
});

//
// Initialize Discord Bot
//
GLOBAL.discordClient = new Discord.Client({
	token: "YOUR_DISCORD_TOKEN", // Keep it somewhere safe and offline
	autorun: true
});
GLOBAL.botConfig = require("./botConfig.json");

//
// The function called when a message is read by the bot
//
function messageListener(user, userID, channelID, message, evt) {
    // Ignore the bot's messages
	if (userID === discordClient.id) return;

	var loweredMessage = message.toLowerCase();
	var trimedMessage = message.trim().replace(/\s+/, " ");

	return async.waterfall([
		// If you want to add some stuff
		function (callback) {
            return callback();
		},
		//commands:
		function (callback) {
			if (trimedMessage.substring(0, botConfig.prefix.length) === botConfig.prefix) {
				libs.commands.executeCommand(user, userID, channelID, message, evt, callback);
			} else {
				return callback();
			}
		}
	], function (err) {
		if (err) logger.error(err);
		return;
	});
}

var firstConnection = true;
discordClient.on("ready", function (evt) {
	logger.info("Logged in as: " + discordClient.username + " - (" + discordClient.id + ")");
    
    if (!firstConnection) return;
	firstConnection = false;
    
	GLOBAL.connectionDate = libs.utils.now();
	
	// Automatic reconnection
	setInterval(function () {
		if (!discordClient.connected) discordClient.connect();
	}, 60e3);
});

discordClient.on("message", messageListener);

//
// Reconnects itself
//
discordClient.on("disconnect", function (err, code) {
	logger.info("Bot disconnected due to code " + code + ", reconnecting.");
	return discordClient.connect();
});

discordClient.on("error", function (err) {
	logger.error(err);
});

//
// Logs uncaught exception in discord, prevents the bot from crashing
//
process.on("uncaughtException", function (err) {
	return discordClient.sendMessage({
		to: botConfig.errorChannelID,
		message: "```\n" + err.stack + "\n```"
	}, function (err) {
		logger.error(err);
	});
});