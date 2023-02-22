const express = require('express');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [32767] });

const app = express();
const port = 3000;
const token = process.env.DISCORD_BOT_TOKEN;

client.on('ready', () => {
  console.log(`Connected as ${client.user.tag}!`);
});

app.use(express.json());

app.post('/embed', (req, res) => {
  const { channelId, message } = req.body;

  const channel = client.channels.cache.get(channelId);

  if (channel && channel.type === 'GUILD_TEXT') {
    if (message.title) {
      const embed = new Discord.MessageEmbed();
      if (message.color) embed.setColor(message.color);
      if (message.title) embed.setTitle(message.title);
      if (message.url) embed.setURL(message.url);
      if (message.author) embed.setAuthor(message.author.name, message.author.icon_url, message.author.url);
      if (message.description) embed.setDescription(message.description);
      if (message.thumbnail) embed.setThumbnail(message.thumbnail.url);
      if (message.fields) {
        message.fields.forEach(field => {
          embed.addField(field.name, field.value, field.inline);
        });
      }
      if (message.image) embed.setImage(message.image.url);
      if (message.timestamp) embed.setTimestamp(message.timestamp);
      if (message.footer) embed.setFooter(message.footer.text, message.footer.icon_url);
      channel.send({ embeds: [embed] }).then(() => {
        res.send('Embed créé avec succès');
      }).catch(err => {
        res.status(500).send('Erreur lors de la création de l\'embed');
        console.error(err);
      });
    } else if (message.action) {
      channel.messages.fetch().then(messages => {
        const embeds = messages.filter(m => m.author.id === client.user.id && m.embeds.length > 0).map(m => m.embeds[0]);
        const embed = embeds[0];

        if (embed) {
          if (message.action === 'edit' && message.fieldIndex !== undefined && message.value) {
            const fieldIndex = message.fieldIndex;
            embed.fields[fieldIndex].value = message.value;
            embed.edit({ embeds: [embed] }).then(() => {
              res.send('Field edited successfully');
            }).catch(err => {
              res.status(500).send('Error editing field');
              console.error('Error editing field', err);
            });
          } else if (message.action === 'edit' && message.fieldId && message.value) {
            const fieldId = message.fieldId;
            const field = embed.fields.find(f => f.id === fieldId);
            if (field) {
              field.value = message.value;
              embed.edit({ embeds: [embed] }).then(() => {
                res.send('Field edited successfully');
              }).catch(err => {
                res.status(500).send('Error editing field');
                console.error('Error editing field', err);
              });
            } else {
              res.status(404).send('Field not found');
            }
          } else if (message.action === 'add' && message.fields) {
            message.fields.forEach(field => {
              embed.addField(field.name, field.value, field.inline);
            });
            embed.edit({ embeds: [embed] }).then(() => {
              res.send('Champ ajouté avec succès');
            }).catch(err => {
              res.status(500).send('Erreur lors de l\'ajout du champ à l\'embed');
              console.error(err);
            });
          } else {
            res.status(400).send('Action not supported or missing required fields');
          }
       } else {
          res.status(404).send('Embed not found');
        }
      }).catch(err => {
        res.status(500).send('Error retrieving messages');
        console.error('Error retrieving messages', err);
      });
    } else {
      res.status(400).send('Action not supported or missing required fields');
    }
  } else {
    res.status(404).send('Channel not found or invalid type');
  }
});

client.login(token);

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
