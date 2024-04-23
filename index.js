// Load environment variables from .env file
require("dotenv").config();

/// Require discord.js library
const { Client } = require('discord.js');
const messageHandler = require("./handlers/messageCreate");

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'DirectMessages']
});

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

// Event listener for incoming messages
client.on('messageCreate', message => {
    messageHandler(client, message);
});

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);
