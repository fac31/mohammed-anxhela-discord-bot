<h1 align="center"> Discord AI Chatbot 🤖💻📱 </h1>

## What is this project about?
Mohamed and Anxhela's chatbot utilizing ChatGPT, deployed within Discord servers. The aim of this project is to create a chatbot for Discord servers and by deploying ChatGPT in Discord, we aim to enrich communication and engagement among users.  Further information on the project brief can be found [here](https://foundersandcoders.notion.site/A-Discord-AI-Chatbot-2d60ae72f6ca4017aa8d567688b2770c).


## What tools do you need in order to set it up locally?
1. _Obtain API Key_:
Sign up for a free API Key at OpenAI.
2. _Create Discord Bot_:
Create a bot on Discord Developers.
Assign necessary permissions (ensure you select bot and applications.commands) and generate a URL.
3. _Invite Bot to Server_:
Invite your bot to a server you manage by pasting the generated link.
4. _Get Bot Token_:
Obtain your bot's token.
5. _Clone Repository_:
```diff
- git clone https://github.com/fac31/mohammed-anxhela-discord-bot
```
7. _Install Dependencies_:
```diff
- npm install
```
8. _Set Environment Variables_:
Create a ```.env``` file in the root directory and enter your API Key and Discord Token:
```diff
- TOKEN=ENTER-TOKEN-HERE
- API_KEY=ENTER-API-KEY-HERE
```
9. _Launch Bot_:
Start your bot in the terminal to bring it online:
node index.js

## What are some development practices that we followed? 
We used ```ESLint``` and ```Prettier``` that help with maintaining consistent code formatting and style, identifying errors, enforcing coding standards, and improving overall code quality. They can catch syntax errors, enforce coding conventions, and automatically format code according to predefined rules, making codebases more manageable and readable, especially in collaborative settings.
