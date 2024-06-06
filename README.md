<h1 align="center"> Flux </h1>

<img align="center" src="https://media.discordapp.net/attachments/1149027807054278666/1248015425590263910/20240606_020145.jpg?ex=66622070&is=6660cef0&hm=b2ba25badd5b0bd1390e3bb969da0fc2379ef73519091fec5dc3f47fcdb0f41f&">

[![Discord](https://img.shields.io/discord/974995947379646534?label=Discord&logo=discord)](https://discord.com/invite/VDPp2g5ECU)
[![GitHub stars](https://img.shields.io/github/stars/devanshyadav2010/flux?style=social)](https://github.com/og-devcords/flux)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to Flux, a versatile Discord bot designed to enhance your server experience with advanced giveaway features.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Try the Live Version](#try-the-live-version)
- [Support](#support)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## Introduction
Flux is a powerful and customizable Discord bot that provides robust giveaway functionalities, advanced features to managing your server easier and more efficient.

## Features
- Advanced Giveaway With Button Support
- Logging for all commands executed
- Error logging for commands
- Integration with MongoDB for data persistence
- Support for Top.gg voting

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) v14 or higher
- [MongoDB](https://www.mongodb.com/) database
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/devanshyadav2010/flux.git
   cd greethub
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration
Create a `.env` file in the root directory and add your configuration details:
```env
TOKEN=YOUR_DISCORD_TOKEN_HERE
MONGO_DB=YOUR_MONGO_DB_CONNECTION_STRING_HERE
CLIENT_ID=YOUR_CLIENT_ID_HERE
TOPGG_TOKEN=YOUR_TOPGG_TOKEN_HERE
```

Alternatively, you can directly edit the `config.js` file:
```javascript
module.exports = {
  TOKEN: process.env.TOKEN || "YOUR_DISCORD_TOKEN_HERE",
  MONGO_DB: process.env.MONGO_DB || "YOUR_MONGO_DB_CONNECTION_STRING_HERE",
  CLIENT_ID: process.env.CLIENT_ID || "YOUR_CLIENT_ID_HERE",
  OWNERS: ["YOUR_DISCORD_USER_ID_HERE"],
  SUPPORT_SERVER: "https://discord.com/invite/fDrwgNG5UN",
  CHANNELS: {
    COMMANDS_LOGS: "YOUR_COMMANDS_LOG_CHANNEL_ID_HERE",
    ERROR_COMMAND_LOGS: "YOUR_ERROR_COMMAND_LOG_CHANNEL_ID_HERE"
  },
  TOPGG: {
    STATUS: true,
    TOKEN: "YOUR_TOPGG_TOKEN_HERE"
  }
}
```

## Running the Bot
Start the bot using the following command:
```bash
node index.js
```

## Try the Live Version
You can invite the live version of GreetHub to your server using this [invite link](https://discord.com/oauth2/authorize?client_id=1043601146004115556&permissions=4397509640183&scope=bot%20applications.commands).

## Support
If you enjoy using GreetHub, please consider supporting us by [voting on Top.gg](https://top.gg/bot/1043601146004115556/vote). Your votes help us reach more users and improve the bot!

## Contributing
We welcome contributions! If you have suggestions for new features or find a bug, please open an issue or submit a pull request on GitHub. Don't forget to star the repo if you like it!

## Acknowledgments
This project was built with inspiration and assistance from the following repositories:
- [ZeroDiscord/Giveaway](https://github.com/ZeroDiscord/Giveaway)
- [sandarutharuneth/ivongiveaways](https://github.com/sandarutharuneth/ivongiveaways)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.