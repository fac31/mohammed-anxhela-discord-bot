// Load environment variables from .env file
require("dotenv").config();

// Require discord.js library
const { Client } = require('discord.js');
const { setupMessageHandler } = require('./messageHandler');
const { setupReadyListener } = require('./readyListener');

// Create Discord client
const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'DirectMessages']
});

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

// // Require event handlers
// const readyHandler = require('./handlers/readyHandler.js');
// const messageHandler = require('./handlers/messageHandler.js');

// Set up event listeners
setupReadyListener(client);
setupMessageHandler(client);

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);