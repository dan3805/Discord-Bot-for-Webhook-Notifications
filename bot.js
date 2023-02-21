const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

// Set the message for the persistent message footer
const MESSAGE = process.env.MESSAGE || 'Default persistent message';

const client = new Discord.Client();
const app = express();
const persistentMessageChannelID = 'CHANNEL_ID';
const TOKEN = process.env.TOKEN || 'DISCORD_BOT_TOKEN_HERE';
let persistentMessage = null;

app.use(bodyParser.json());

client.on('ready', async () => {
  console.log(`Connected as ${client.user.tag}!`);

  // Get the channel for the persistent message
  const channel = client.channels.cache.get(persistentMessageChannelID);

  // Check if a persistent message has already been sent in the channel
  const messages = await channel.messages.fetch();
  persistentMessage = messages.find(m => m.author.id === client.user.id && m.embeds[0].footer.text === MESSAGE);

  // If a persistent message has already been sent, retrieve its ID
  if (persistentMessage) {
    console.log(`ID of existing persistent message: ${persistentMessage.id}`);
  }
  // Otherwise, send a new persistent message and retrieve its ID
  else {
    persistentMessage = await channel.send({
      embed: {
        title: 'Persistent message',
        description: 'This is a persistent message that will be updated',
        color: 0x00ff00,
        footer: {
          text: MESSAGE
        }
      }
    });
    console.log(`ID of new persistent message: ${persistentMessage.id}`);
  }
});

// Receive notifications from the Overseerr API
app.post('/notification-endpoint', (req, res) => {
  const notification = req.body;
  console.log(`New notification received: ${JSON.stringify(notification)}`);

  const embed = { ...persistentMessage.embeds[0] };

  // If the "update_embed" field is present, update the message embed with the new values
  if (notification.update_embed) {
    for (const [key, value] of Object.entries(notification.update_embed)) {
      if (key in embed) {
        embed[key] = value;
      } else if (key === 'fields') {
        // Update a field based on its contents
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

  // If the "update_field" field is present, update the specified field in the message embed
  if (notification.update_field) {
    const { name, value } = notification.update_field;
    const field = embed.fields.find(field => field.name.includes(name));
    if (field) {
      field.name = name;
      field.value = value;
    }
  }

  // If the "delete_field" field is present, remove the specified field from the message embed
  if (notification.delete_field) {
    const index = embed.fields.findIndex(field => field.name === notification.delete_field);
    if (index !== -1) {
      embed.fields.splice(index, 1);
    }
  }

  persistentMessage.edit({
    embed: embed
  });

  res.status(200).end();
});

client.login(TOKEN);

app.listen(3000);
