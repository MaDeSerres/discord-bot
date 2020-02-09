const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
const querystring = require('querystring');

module.exports = {
  name: 'urban',
  description: 'Return a definition from the urban dictionary',
  cooldown: 5,
  async execute(message, args) {
    if (!args.length) {
      return message.channel.send('You need to supply a search term!');
    }
    const query = querystring.stringify({ term: args.join(' ') });
    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

    if (!list.length) {
      return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
    const [answer] = list;
    const embed = new RichEmbed()
      .setColor('#EFFF00')
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addField('Definition', trim(answer.definition, 1024))
      .addField('Example', trim(answer.example, 1024))
      .addField('Rating', `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`);

    message.channel.send(embed);
  },
};