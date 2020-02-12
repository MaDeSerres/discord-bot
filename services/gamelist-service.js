const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');

const maps = [
  'Archangel 11.65.w3m',
  'Digimon TD-ENG.w3x',
  'AA 12.2',
];

module.exports = {
  name: 'gamelist',
  description: 'Return the current gamelist',
  cooldown: 5,
  async execute(channels) {
    const list = await fetch('https://api.wc3stats.com/gamelist').then(response => response.json());
    for (const body of list.body) {
      if (body.server === 'usw' && maps.includes(body.map)) {
        const embed = new RichEmbed()
          .setColor('#EFFF00')
          .setTitle(body.map)
          .addField('Game name', body.name)
          .addField('Hosted by', body.host)
          .addField('Players', `${body.slotsTaken}/${body.slotsTotal}`);
        const channel = channels.find(c => c.name === 'lobbies');
        channel.send(embed);
      }
    }
  },
};
