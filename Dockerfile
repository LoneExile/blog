FROM node:22.23.4@sha256:63538dfe497cc29dfafdda25ada09b46db68a3f4cc205abf1f5d6bf0913f3384 AS builder

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

WORKDIR /blog

# pnpm's version is the exact one in package.json "packageManager"; corepack fetches it.
# pnpm-workspace.yaml (overrides, allowBuilds) and .npmrc change what a frozen install
# resolves, so they must be present for the install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN corepack enable && corepack install && pnpm install --frozen-lockfile --ignore-scripts
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
