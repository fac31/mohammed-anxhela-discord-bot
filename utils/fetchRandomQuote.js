// utils/fetchRandomQuote.js

const fetch = require('node-fetch');

async function fetchRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error("Error fetching quote:", error.message);
        return null;
    }
}

exports.fetchRandomQuote = fetchRandomQuote;