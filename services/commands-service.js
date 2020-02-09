const fs = require('fs');

module.exports = {
  setCommdands: function(commands) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.set(command.name, command);
    }
  },
};