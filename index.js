// Load environment variables from .env file
require("dotenv").config();

// Require discord.js library
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI }  = require('openai');

//Prepare to connect to the Discord API
// Create a new Discord client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

// Event listener for incoming messages
//Check when a message on discord is sent
client.on('messageCreate', async function(message) {
  // Your message handling logic goes here
  console.log(message.content);
  if (message.author.bot) return;
  const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
            //name: 
            role: 'system',
            content: 'ChatGPT is a nice chatbot.'
        },
        {
            //name: 
            role: 'user',
            content: message.content,
        }
      ]  
    }).catch((error) => console.error("OpenAI Error: ", error));
  
  //console.log(response.choices[0].message);
  message.reply(response.choices[0].message.content)
});

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);

//Prepare connection to the OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});








