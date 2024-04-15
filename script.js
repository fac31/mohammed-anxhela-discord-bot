require("dotenv").config();

const Discord = require("discord.js");
const openai = require("openai");

const client = new Discord.Client();
// Use process.env.DISCORD_TOKEN to access your Discord token
client.login(process.env.DISCORD_TOKEN);

// Use process.env.OPENAI_API_KEY to access your OpenAI API key
openai.configure({
  apiKey: process.env.OPENAI_API_KEY,
});

// Now you can safely use your API keys without hard-coding them into your project
