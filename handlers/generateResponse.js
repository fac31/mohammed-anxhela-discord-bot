const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateResponse(input) {
    // Generate response using OpenAI
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{
                role: 'system',
                content: 'ChatGPT is a nice chatbot.'
            },
            {
                role: 'user',
                content: input,
            }
        ]
    });

    // Extract the response message
    let responseMessage = response.choices[0].message.content;

    // Check if the response message exceeds 2000 characters
    if (responseMessage.length > 2000) {
        const chunkSizeLimit = 2000;
        const chunks = [];

        // Split the response message into chunks of 2000 characters
        for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
            chunks.push(responseMessage.substring(i, i + chunkSizeLimit));
        }

        // Return the array of message chunks
        return chunks;
    }

    // Return the response message if it's within the character limit
    return responseMessage;
}

module.exports = { generateResponse };
