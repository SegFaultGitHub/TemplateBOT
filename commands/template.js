var path = require("path");

module.exports = {
    func: function (user, userID, channelID, message, evt, args, callback) {
        return callback();
    },
    help: {
        usage: botConfig.prefix + path.basename(__filename, ".js"),
        message: ""
    }
};