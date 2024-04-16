// Load environment variables from .env file
require("dotenv").config();

// Require discord.js library
const Discord = require("discord.js");
const openai = require("openai");

// Create a new Discord client
const client = new Discord.Client();

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

// Event listener for incoming messages
client.on('message', message => {
    // Your message handling logic goes here
    console.log('Received message:', message.content);
});

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);

// Use process.env.OPENAI_API_KEY to access your OpenAI API key
openai.configure({
  apiKey: process.env.OPENAI_API_KEY,
});
