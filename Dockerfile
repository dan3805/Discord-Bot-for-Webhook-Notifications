FROM node:latest

ARG GITHUB_REPO_URL

WORKDIR /start-script

RUN apt-get update && apt-get install -y git
RUN npm install discord.js express
RUN curl -o start.sh $(echo $GITHUB_REPO_URL | sed 's/\.git//')/main/start.sh && chmod +x start.sh

CMD ["sh", "/start-script/start.sh"]
