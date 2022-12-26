FROM node:16 as Production

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start", "--host"]


