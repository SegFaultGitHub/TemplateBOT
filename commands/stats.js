var async = require("async");

module.exports = {
    func: function (user, userID, channelID, message, evt, args, callback) {
        if (args.length !== 0) {
            return callback(null, {
                type: "MISUSED"
            });
        }
        embed = {
            title: " :bar_chart: " + botConfig.botName + "'s stats",
            fields: []
        };

        return async.series({
            uptime: function (callback) {
                embed.fields.push({
                    name: ":clock4: Uptime",
                    value: "• **Online for**: " + libs.utils.secondsToTimestamp(libs.utils.now() - connectionDate)
                });
                return callback();
            }
        }, function (err) {
            if (err) return callback(err);
            return discordClient.sendMessage({
                to: channelID,
                embed: embed
            }, function (err) {
                if (err) return callback(err);
                else return callback(null, {
                    type: "GOOD"
                });
            });
        });
    },
    help: {
        usage: botConfig.prefix + "stats",
        message: "Display various stats concerning the bot"
    }
};