# HOW TO USE
## Discord.io module
The nodejs module used for the bot is not in `./package.json`. You have to install it manually with the command `npm install woor/discord.io#gateway_v6`.
The github of this module can be found [here](https://github.com/izy521/discord.io).

## Personnal informations
Place your personnal information in `./botConfig.json`.
- `YOUR_BOT_NAME`: The name of your bot. It is used for the stats command
- `YOUR_ERROR_CHANNEL`: The ID of the channel in which you want the uncaught exception to be displayed

Inside `./bot.js` (line 42), you have to put your personnal discord token in `YOUR_DISCORD_TOKEN`. Figure out a way to keep this value safe and offline.

## Commands
All commands have to be stored in the folder `./commands/`. Each file inside this folder will be a command, usable by the users.
A command is templated like this:
```javascript
module.exports = {
    func: function (user, userID, channelID, message, evt, args, callback) {
        return callback();
    },
    help: {
        usage: botConfig.prefix + "cmd [option...]",
        message: "message"
    }
};
```
The `func` function will be called when a user uses the command. The help object is used for the help command.