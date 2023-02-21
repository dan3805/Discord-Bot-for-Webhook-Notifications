# Discord Bot for Webhook Notifications

This Discord bot is designed to handle notifications from webhooks such as Overseerr or Tautulli. It uses the Discord.js and Express.js APIs to display a persistent message in a Discord channel, and to update the message based on notifications received from the webhook. The bot can update the title, description, color, and fields of the persistent message using HTTP POST requests with the "update_embed", "update_field", and "delete_field" fields. The bot also uses the body-parser package to parse JSON data received by the POST requests.

## Usage

To use this bot, follow these steps:

1. Install the necessary dependencies by running `npm install` in the terminal.
2. Set the appropriate values for `persistentMessageChannelID` and `client.login()` in the code. You should also set the correct port number for `app.listen()` if necessary.
3. Run the bot by running `node example.js` in the terminal.
4. Configure the webhook to send notifications to the endpoint `http://yourserver.com/notification-endpoint`.
5. Send HTTP POST requests to the endpoint to update the persistent message with the desired information.

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
{
  "delete_field": "Field 3"
}
Please note that this is just an example implementation of a Discord bot for webhook notifications, and you may need to modify it to fit your specific needs.

