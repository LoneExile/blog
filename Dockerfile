FROM node:18.15.0

WORKDIR /blog

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY . .
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "/blog/dist/server/entry.mjs"]
