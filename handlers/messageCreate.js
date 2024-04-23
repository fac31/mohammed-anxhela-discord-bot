const { PermissionsBitField, ChannelType } = require('discord.js');
const frq = require('../utils/fetchRandomQuote');
const { generateResponse } = require('./generateResponse');


// Event listener for incoming messages
const messageHandler = async (client,message) => {
    try {
        // Check if message is from a bot or not in a guild
        if (message.author.bot || !message.guild) return;

        // Show typing indicator
        message.channel.sendTyping();

        // Check if the message starts with the bot's prefix
        const prefix = '!';
        if (message.content.startsWith(prefix)) {
            // If it's a command, extract the command and arguments from the message content
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            // Process commands
            switch (command) {
                case 'ping':
                    message.reply('Pong!');
                    break;
                case 'hello':
                    message.reply('Hello!');
                    break;
                case 'help':
                    message.reply('Available commands: !ping, !hello, !quote, !calculate, !senddm, !createchannel');
                    break;
                case 'quote':
                    const quote = await frq.fetchRandomQuote();
                    message.reply(quote ? `Here's a random quote for you: ${quote}` : 'Sorry, failed to fetch a quote at the moment.');
                    break;
                case 'calculate':
                    const expression = args.join(' ');
                    try {
                        const result = eval(expression);
                        message.reply(`Result: ${result}`);
                    } catch (error) {
                        message.reply('Invalid expression.');
                    }
                    break;
                case 'senddm':
                    const user = message.mentions.users.first();
                    if (!user) {
                        message.reply('Please mention a user to send a direct message.');
                        return;
                    }
                    if (!user.bot && user.id !== client.user.id) {
                        user.send('This is a direct message from the bot!')
                            .then(() => message.reply('Direct message sent successfully!'))
                            .catch((error) => message.reply('Failed to send direct message. Please make sure the user allows direct messages from server members.'));
                    } else {
                        message.reply('You cannot send direct messages to bots or to yourself.');
                    }
                    break;
                    case 'createchannel':
                        // Check if the message is from a guild
                        if (!message.guild) {
                            message.reply("This command can only be used in a server (guild).");
                            return;
                        }
                        // Check if the user has permission to manage channels
                        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                            message.reply("You don't have permission to create channels.");
                            return;
                        }
                        
                        // Get the guild where you want to create the channel
                        const guild = message.guild;
                        
                        // Define the permissions for the channel
                        const permissions = [{
                            id: guild.roles.everyone, // Set permissions for @everyone role
                            deny: [PermissionsBitField.Flags.ViewChannel] // Deny view permission
                        }];                        
                        
                        // Create the channel with specified permissions
                        guild.channels.create({
                            name: 'private-channel',
                            type: ChannelType.GuildText,
                            permissionOverwrites: permissions
                        })
                        .then(channel => {
                            message.reply(`Private channel created: ${channel}`);
                        })
                        .catch(error => {
                            console.error('Error creating channel:', error);
                            message.reply('Failed to create private channel.');
                        });

                        break;
                default:
                    // If the command is not recognized, do nothing
                    break;
            }
        } else {
            // Process non-command messages using OpenAI
            const response = await generateResponse(message.content);

            // Check if the response is an array of chunks
            if (Array.isArray(response)) {
                // Reply with each chunk separately
                for (const chunk of response) {
                    await message.reply(chunk);
                }
            } else {
                // Reply with the single response
                await message.reply(response);
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
        message.reply("Error processing message. Please try again later.");
    }
};

// exports.messageHandler = messageHandler;
module.exports = messageHandler;