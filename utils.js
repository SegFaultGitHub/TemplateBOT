module.exports = function (callback) {
    return callback(null, {
        secondsToTimestamp: function (epoch) {
            epoch = epoch / 1000;
            var uptime = {
                days: Math.floor(epoch / (60 * 60 * 24)),
                hours: Math.floor(epoch % (60 * 60 * 24) / (60 * 60)),
                minutes: Math.floor(epoch % (60 * 60) / 60),
                seconds: Math.floor(epoch % 60)
            };

            var result = "";
            if (uptime.days) result += uptime.days + " day" + (uptime.days > 1 ? "s " : " ");
            if (uptime.hours) result += uptime.hours + " hour" + (uptime.hours > 1 ? "s " : " ");
            if (uptime.minutes) result += uptime.minutes + " minute" + (uptime.minutes > 1 ? "s " : " ");
            if (uptime.seconds) result += uptime.seconds + " second" + (uptime.seconds > 1 ? "s " : " ");
            return result.trim() || "0 second";
        },
        now: function (plus) {
            return new Date().getTime() + (plus || 0) * 1e3;
        }
    });
};