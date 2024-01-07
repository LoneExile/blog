FROM node:latest as builder

WORKDIR /blog

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY . .

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build

ENV PUBLIC_REMARK_URL=https://remark.voidbox.io

FROM builder as dev

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "/blog/dist/server/entry.mjs"]

