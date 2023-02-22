#!/bin/sh

if [ ! -f /app/bot.js ]; then
  git clone $GITHUB_REPO_URL /app && npm install
fi

node /app/bot.js
