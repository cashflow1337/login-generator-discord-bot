const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1337));

app.get('/', function (request, response) {
    var result = 'Generator started'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('Generator started, using port ', app.get('port'));
});
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "You have recently generated an account. Please try again later! (Cooldown: 2 hours)");
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("please choose a region!");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";

                const embed = {
                    title: "OOS!",
                    description: "We are currently out of stock!",
                    color: 0xffcc00,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png",
                        text: "Developed by cashflow#1337"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png"
                    },
                    author: {
                        name: "Cashflow Gen",
                        url: "",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Successfully generated account!",
                                    description: "Check your DMs!",
                                    color: 0xffcc00,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png",
                                        text: "Developed by cashflow#1337"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png"
                                    },
                                    author: {
                                        name: "Cashflow Gen",
                                        url: "",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 7150000); // 86400000 = 24h
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("OOS!");
                        }
                    } else {
                        const embed = {
                            title: "Region not found!",
                            description: "The requested region could not be found!",
                            color: 0xffcc00,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png",
                                text: "Developed by cashflow#1337"
                            },
                            thumbnail: {
                                url:
                                    "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png"
                            },
                            author: {
                                name: "Cashflow Gen",
                                url: "",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
        
            if (command === "help") {

                const embed = {
                    color: 0xffcc00,
                    title: 'Cashflow Gen',
                    url: '',
                    description: '**This is a list of all commands**',
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png',
                    },
                    fields: [
                        {
                            name: 'Generate Accounts',
                            value: 'Usage: /gen <region>',
                        },

                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Developed by cashflow#1337',
                        icon_url: 'https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You do not have permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a valid account format!")
            if(!service) return message.reply("Provide a region first!")
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Successfully added account to this region",
                    color: 0xffcc00,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png",
                        text: "Developed by cashflow#1337"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png"
                    },
                    author: {
                        name: "Cashflow Gen",
                        url: "",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You do not have permissions to do that!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'test:test', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Region added!",
                    description: "Successfully added region " + args[0] + "!",
                    color: 0xffcc00,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png",
                        text: "Developed by cashflow#1337"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png"
                    },
                    author: {
                        name: "Cashflow Gen",
                        url: "",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restocked") {
            const embed = {
                title: "Provide a region!",
                description: "Please provide the region of the restocked accounts!",
                color: 0xffcc00,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png",
                    text: "Developed by cashflow#1337"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/attachments/880052106847993878/880063143294955570/d4eaa6c7b23df20958f34d8afc745f3a.png"
                },
                author: {
                    name: "Cashflow Gen",
                    url: "",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You do not have permissions to do that!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("@everyone region " + args[0] + " has been restocked!");
            }
        }
    }
});

bot.login(config.token);