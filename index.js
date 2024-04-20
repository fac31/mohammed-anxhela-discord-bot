// Load environment variables from .env file
require("dotenv").config();

// Require discord.js library
const { Client } = require('discord.js');
const { OpenAI }  = require('openai');

const client = new Client({
  intents: ['Guilds', 'GuildMembers','GuildMessages', 'MessageContent']
});

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});




// Event listener for incoming messages
client.on('messageCreate', async function(message) {
  // Check if message is from a bot
  if (message.author.bot) return;

  try {
    // Send typing indicator
    const typingIndicator = await message.channel.sendTyping();
    // Generate response using OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'ChatGPT is a nice chatbot.'
        },
        {
          role: 'user',
          content: message.content,
        }
      ]
    });

    // Log the generated response
    console.log(response.choices[0].message);

    // Wait for a short delay (e.g., 1 second) before sending the response
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if typingIndicator is defined before attempting to delete it
    if (typingIndicator) {
      // Edit the typing indicator message to remove it
      await typingIndicator.delete();
    }

    // if the message is more than 3000 characters, then split it.
    const responseMessage = response.choices[0].message.content;
    const chunkSizeLimit = 2000;

    for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
      const chunk = responseMessage.substring(i, i + chunkSizeLimit);

      await message.reply(chunk);
    }
  } catch (error) {
    // Handle OpenAI errors
    console.error("OpenAI Error:", error.message);
    message.reply("Error generating response. Please try again later.");
  }
});


// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);

//Prepare connection to the OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
