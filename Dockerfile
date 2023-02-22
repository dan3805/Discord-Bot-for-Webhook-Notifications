FROM node:latest

ARG GITHUB_REPO_URL

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN git clone $GITHUB_REPO_URL . && \
    npm install && \
    npm install discord.js express
