const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [32767] });
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const persistentMessageChannelID = process.env.CHANNEL_ID || 'Channel_ID_HERE';
const TOKEN = process.env.TOKEN || 'DISCORD_BOT_TOKEN_HERE';
console.log(`Token: ${TOKEN}`);
let persistentMessage = null;

app.use(bodyParser.json());

client.on('ready', async () => {
  console.log(`Connected as ${client.user.tag}!`);

  // Get the channel for the persistent message
  const channel = client.channels.cache.get(persistentMessageChannelID);

  // Check if a persistent message has already been sent in the channel
  const messages = await channel.messages.fetch();
  persistentMessage = messages.find(m => m.author.id === client.user.id && m.embeds[0].footer.text === 'Persistent message');

  // If a persistent message has already been sent, we retrieve its ID
  if (persistentMessage) {
    console.log(`ID of the persistent message retrieved: ${persistentMessage.id}`);
  }
  else {
    persistentMessage = await channel.send({
      embeds: [{
        title: 'Persistent message',
        description: 'This is a persistent message that will be updated',
        color: 0x00ff00,
        footer: {
          text: 'Persistent message'
        }
      }]
    });
    console.log(`ID of the persistent message created: ${persistentMessage.id}`);
  }
});

// Receive notifications from the Overseerr API
app.post('/notification-endpoint', (req, res) => {
  const notification = req.body;
  console.log(`New notification received: ${JSON.stringify(notification)}`);

  const embed = persistentMessage.embeds.length > 0 ? { ...persistentMessage.embeds[0] } : {};

  if (embed.footer && embed.footer.text === 'Persistent message') {
    // Update the embed message with the new values
    if (notification.update_embed) {
      for (const [key, value] of Object.entries(notification.update_embed)) {
        if (key in embed) {
          embed[key] = value;
        } else if (key === 'fields') {
          // Update a field based on its content
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

    // If the "update_field" field is present, we update the specified field in the embed message
    if (notification.update_field) {
      const { name, value } = notification.update_field;
      const field = embed.fields.find(field => field.name.includes(name));
      if (field) {
        field.name = name;
        field.value = value;
      }
    }

    // If the "delete_field" field is present, we remove the specified field from the embed message
    if (notification.delete_field) {
      const index = embed.fields.findIndex(field => field.name === notification.delete_field);
      if (index !== -1) {
        embed.fields.splice(index, 1);
      }
    }

    if (!embed || !embed.title) {
      console.log('Invalid embed structure');
      return res.status(400).end();
    }

    persistentMessage.edit({
      embeds: [embed]
    });
  }
  res.status(200).end();
});

console.log('TOKEN : ' + TOKEN);

client.login(TOKEN);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
