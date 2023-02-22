const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

const client = new Discord.Client();
const app = express();
const persistentMessageChannelID = process.env.PERSISTENT_MESSAGE_CHANNEL_ID;
let persistentMessage = null;

app.use(bodyParser.json());

client.on('ready', async () => {
  console.log(`Connected as ${client.user.tag}!`);

  const channel = client.channels.cache.get(persistentMessageChannelID);

  const messages = await channel.messages.fetch();
  persistentMessage = messages.find(m => m.author.id === client.user.id && m.embeds[0].footer.text === 'Persistent message');

  if (persistentMessage) {
    console.log(`ID of existing persistent message: ${persistentMessage.id}`);
  } else {
    persistentMessage = await channel.send({
      embeds: [{
        title: 'Persistent message',
        description: 'This is a persistent message that will be updated',
        color: 0x00ff00,
        footer: {
          text: 'Default persistent message'
        }
      }]
    });
    console.log(`ID of new persistent message: ${persistentMessage.id}`);
  }
});

app.post('/notification-endpoint/:secret', (req, res) => {
  const secret = req.params.secret;

  if (secret !== process.env.SECRET) {
    console.log(`Invalid secret parameter: ${secret}`);
    res.status(401).end();
    return;
  }

  const notification = req.body;
  console.log(`New notification received: ${JSON.stringify(notification)}`);

  const embed = { ...persistentMessage.embeds[0] };
  if (notification.update_embed) {
    for (const [key, value] of Object.entries(notification.update_embed)) {
      if (key in embed) {
        embed[key] = value;
      } else if (key === 'fields') {
        value.forEach(newField => {
          const oldField = embed.fields.find(field => field.name.includes(newField.name));
          if (oldField) {
            oldField.name = newField.name;
            oldField.value = newField.value;
          }
        });
      }
    }
  }

  if (notification.update_field) {
    const { name, value } = notification.update_field;
    const field = embed.fields.find(field => field.name.includes(name));
    if (field) {
      field.name = name;
      field.value = value;
    }
  }

  if (notification.delete_field) {
    const index = embed.fields.findIndex(field => field.name === notification.delete_field);
    if (index !== -1) {
      embed.fields.splice(index, 1);
    }
  }

  persistentMessage.edit({
    embeds: [embed]
  });

  res.status(200).end();
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server started on port ${process.env.PORT || 3000}`);
});
