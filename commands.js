var async = require("async");
var fs = require("fs");

function executeCommand(user, userID, channelID, message, evt, callback) {
    var args = message.split(" ");
    var cmd = args[0].toLowerCase().substring(botConfig.prefix.length, args[0].length);
    if (Object.keys(libs.commands.commands).indexOf(cmd) !== -1) {
        args = args.splice(1);
        return async.waterfall([
            function (callback) {
                return libs.commands.commands[cmd].func(user, userID, channelID, message, evt, args, callback);
            },
            function (retval, callback) {
                if (retval.type === "MISUSED") {
                    // Replicates the usage of ~help cmd
                    return executeCommand(user, userID, channelID, botConfig.prefix  + "help " + cmd, evt, callback);
                } else {
                    return callback();
                }
            }
        ], callback);
    } else {
        return callback("Command " + cmd + " does not exist.");
    }
}

module.exports = function (callback) {
    var commands = {};
    fs.readdir(__dirname + "/commands", function (err, res) {
        res.forEach(function (name) {
            // Remove ".js" to get the command name
            commands[name.substring(0, name.length - 3)] = require(__dirname + "/commands/" + name);
        });
        logger.info("Commands loaded.");

        return callback(null, {
            commands: commands,
            executeCommand: executeCommand
        });
    });
};