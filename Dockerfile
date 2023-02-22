FROM node:latest

ARG GITHUB_REPO_URL

WORKDIR /app

RUN apk update && apk add apk-tools

RUN apk add --no-cache git && \
    git clone $GITHUB_REPO_URL . && \
    npm install && \
    npm install discord.js express

CMD ["node", "bot.js"]
