FROM node:18.15.0

WORKDIR /blog

RUN apt-get update && \
  apt-get install -y git

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm run build

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]

