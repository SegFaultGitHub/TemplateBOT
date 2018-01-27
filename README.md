# HOW TO USE
## Discord.io module
Please check [here](https://github.com/izy521/discord.io) for documentation and source code of the discord module.

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