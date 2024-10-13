FROM node:20 AS builder

WORKDIR /blog

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install --ignore-scripts -g pnpm@9.0.6 && pnpm install --ignore-scripts
COPY . .

ENV PUBLIC_REMARK_URL=https://remark.voidbox.io
ENV PUBLIC_TURNSTILE_KEY=0x4AAAAAAAPw32CkVrP409aE
ENV PUBLIC_TURNSTILE_HANDLE_API="https://listmonk1-handle.voidbox.io/api/subscribe"

RUN pnpm run build

FROM builder

ARG USERNAME=blog
ARG USER_UID=1001
ARG USER_GID=$USER_UID

RUN groupadd --gid "$USER_GID" "$USERNAME" \
  && useradd --uid "$USER_UID" --gid "$USER_GID" -m "$USERNAME"

USER $USERNAME

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "/blog/dist/server/entry.mjs"]
