const fetch = require('node-fetch');

module.exports = {
  name: 'cat',
  description: 'Return a random cat picture',
  cooldown: 5,
  async execute(message) {
    const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

    message.channel.send(file);
  },
};