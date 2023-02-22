# Discord Bot for Webhook Notifications
This Discord bot is designed to handle notifications from webhooks such as Overseerr or Tautulli. It uses the Discord.js and Express.js APIs to display a persistent message in a Discord channel, and to update the message based on notifications received from the webhook. The bot can update the title, description, color, and fields of the persistent message using HTTP POST requests with the "update_embed", "update_field", and "delete_field" fields. The bot also uses the body-parser package to parse JSON data received by the POST requests.
&nbsp;  
&nbsp;  
&nbsp;   

## Getting Started
### To use this bot with Docker, follow these steps:

- Install Docker and Docker Compose on your machine.
- Create a new directory for the bot code and create a new docker-compose.yml file in that directory.
- Copy and paste the contents of the docker-compose.yml file provided in this repository into your docker-compose.yml file.
- In the docker-compose.yml file, set the values for the following environment variables:

  - DISCORD_BOT_TOKEN:
    - `Discord bot token, which can be found in the Discord developer portal under the "Bot" section of the application settings. Make sure to keep this value secret.`

  - PERSISTENT_MESSAGE_CHANNEL_ID: 
    - `ID of the channel where the persistent message should be sent. This value can be found by right-clicking on the channel in the Discord app and selecting "Copy ID".`

  - BOT_SECRET:
    - `Secret value used for security purposes, which should match the value used in the notification-endpoint route in the bot.js file.`

  - MESSAGE:
    - `Persistent message footer, which is used to identify the message created by the bot when it starts up. This value can be changed to whatever you want.`

- Start the container by running docker-compose up -d.

That's it! Your Discord bot should now be up and running in a Docker container.
&nbsp;  
&nbsp;  
&nbsp;   

``To use your own repo on GitHub
In the docker-compose.yml file, set the value for the GITHUB_REPO_URL argument to the URL of your bot's repository on GitHub. You can find this URL by going to your repository page on GitHub, clicking on the "Code" button, selecting HTTPS, and copying the URL to paste into the Dockerfile for cloning and building the image.
``
&nbsp;  
&nbsp;  
&nbsp;   
## As an alternative or for testing purposes, you can use the following command with Docker run to build and run the bot:
```
sudo docker build -t my-custom-discord-bot --build-arg GITHUB_REPO_URL=https://github.com/dan3805/Discord-Bot-for-Webhook-Notifications.git - < <(curl -s https://raw.githubusercontent.com/dan3805/Discord-Bot-for-Webhook-Notifications/main/Dockerfile) && \
sudo docker run -d -p 3000:3000 \
-e DISCORD_BOT_TOKEN=<your_discord_bot_token> \
-e BOT_SECRET=<your_bot_secret> \
-e PERSISTENT_MESSAGE_CHANNEL_ID=<your_channel_id> \
-e MESSAGE=<your_persistent_message> \
my-custom-discord-bot

```
\
\
\
\
\
\
Here's an example of a JSON payload for a POST request that updates the title and description of the persistent message:


## Create a new embed:
```{
  "channelId": "1234567890",
  "message": {
    "title": "Welcome!",
    "description": "Thanks for joining our server!",
    "color": 6570404,
    "thumbnail": {
      "url": "https://i.imgur.com/uvDyOVz.png"
    },
    "fields": [
      {
        "name": "Field 1",
        "value": "This is the first field",
        "inline": true
      },
      {
        "name": "Field 2",
        "value": "This is the second field",
        "inline": true
      }
    ],
    "footer": {
      "text": "Bot created by YourName",
      "icon_url": "https://i.imgur.com/q5U6GBo.png"
    }
  }
}
```

## Edit an existing field by index:
```
{
  "channelId": "1234567890",
  "message": {
    "action": "edit",
    "fieldIndex": 0,
    "value": "New value for the first field"
  }
}

```

## Edit an existing field by ID:
```
{
  "channelId": "1234567890",
  "message": {
    "action": "edit",
    "fieldId": "1234567890",
    "value": "New value for the field with ID 1234567890"
  }
}

```
## Add a new field:
```
{
  "channelId": "1234567890",
  "message": {
    "action": "add",
    "fields": [
      {
        "name": "Field 3",
        "value": "This is the third field",
        "inline": false
      }
    ]
  }
}
```
## Set the embed color: 
### To set the color of the embed, add a color field to the message object with a valid hexadecimal color code (without the # symbol). For example:
{
  "channelId": "123456789012345678",
  "message": {
    "title": "Example Embed",
    "color": "00ff00",
    "description": "This is an example embed with a green color"
  }
}
## Add an image to the embed:
### To add an image to the embed, add an image field to the message object with a url field containing the URL of the image. For example:
```
{
  "channelId": "123456789012345678",
  "message": {
    "title": "Example Embed",
    "image": {
      "url": "https://example.com/image.png"
    },
    "description": "This is an example embed with an image"
  }
}
```
## Set the author icon and URL: 
### To set the icon and URL of the author field, add an author field to the message object with name, iconUrl, and url fields. For example:
```
{
  "channelId": "123456789012345678",
  "message": {
    "title": "Example Embed",
    "author": {
      "name": "John Doe",
      "iconUrl": "https://example.com/avatar.png",
      "url": "https://example.com"
    },
    "description": "This is an example embed with an author"
  }
}
```
## Set the footer icon and text:
### To set the icon and text of the footer field, add a footer field to the message object with text and iconUrl fields. For example:
```
{
  "channelId": "123456789012345678",
  "message": {
    "title": "Example Embed",
    "footer": {
      "text": "© 2023 Example.com",
      "iconUrl": "https://example.com/favicon.ico"
    },
    "description": "This is an example embed with a footer"
  }
}
```
## here's an example of a more complex JSON message that could be used to create, edit, and delete fields in an embed:
### This message will create a new embed in the specified channel, with three fields. It will then update the values of the first two fields and delete the third field. Finally, it will add a new fourth field to the embed. The action field specifies that this is an edit operation, and the fieldsToUpdate, fieldsToDelete, and newFields fields specify the changes to be made to the embed.
```
{
  "channelId": "123456789012345678",
  "message": {
    "title": "My Embed",
    "color": "#008000",
    "description": "This is my test embed.",
    "fields": [
      {
        "name": "Field 1",
        "value": "This is the first field.",
        "inline": true
      },
      {
        "name": "Field 2",
        "value": "This is the second field.",
        "inline": true
      },
      {
        "name": "Field 3",
        "value": "This is the third field.",
        "inline": false
      }
    ],
    "action": "edit",
    "fieldsToUpdate": [
      {
        "name": "Field 1",
        "value": "This is the updated value of Field 1."
      },
      {
        "name": "Field 2",
        "value": "This is the updated value of Field 2."
      }
    ],
    "fieldsToDelete": [
      "Field 3"
    ],
    "newFields": [
      {
        "name": "Field 4",
        "value": "This is the new fourth field.",
        "inline": false
      }
    ]
  }
}
```

Please note that this is just an example implementation of a Discord bot for webhook notifications, and you may need to modify it to fit your specific needs.

## Acknowledgements

This code was written with the assistance of ChatGPT, an AI language model developed by OpenAI. While the code has been thoroughly tested, it may not be perfect, and any feedback or suggestions for improvement are welcome.
