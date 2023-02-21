FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install discord.js express

COPY . .

CMD ["node", "bot.js"]
