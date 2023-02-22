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

```json
{
  "update_embed": {
    "title": "New Title",
    "description": "New Description"
  }
}
```
Similarly, you can send POST requests to update specific fields of the message using the update_field field, or delete specific fields using the delete_field field. Here are a few more examples:

## Update the color of the message
```
{
  "update_embed": {
    "color": 16711680
  }
}
```

## Update a specific field in the message
```
{
  "update_field": {
    "name": "Field 2",
    "value": "New Value for Field 2"
  }
}
```
## Delete a specific field from the message
```
{
  "delete_field": "Field 3"
}
```
Please note that this is just an example implementation of a Discord bot for webhook notifications, and you may need to modify it to fit your specific needs.

## Acknowledgements

This code was written with the assistance of ChatGPT, an AI language model developed by OpenAI. While the code has been thoroughly tested, it may not be perfect, and any feedback or suggestions for improvement are welcome.
