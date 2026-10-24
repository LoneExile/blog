# Base images are pinned by multi-arch index digest. To bump one:
#   crane digest node:<tag>        (then update both the tag and the digest)
# Node must satisfy astro's engines (>=22.23.4) and match .nvmrc.

# ---- base: node + the pnpm version pinned in package.json ("packageManager") ----
FROM node:22.23.4@sha256:63538dfe497cc29dfafdda25ada09b46db68a3f4cc205abf1f5d6bf0913f3384 AS base

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

WORKDIR /blog

# pnpm-workspace.yaml (overrides, allowBuilds) and .npmrc change what a frozen install
# resolves, so they must be present for every install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN corepack enable && corepack install

# ---- prod-deps: only what `node dist/server/entry.mjs` imports at runtime ----
FROM base AS prod-deps

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# ---- builder: full install + astro build ----
FROM base AS builder

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

ENV PUBLIC_REMARK_URL=https://remark.voidbox.io
ENV PUBLIC_TURNSTILE_KEY=0x4AAAAAAAPw32CkVrP409aE
ENV PUBLIC_TURNSTILE_HANDLE_API="https://listmonk1-handle.voidbox.io/api/subscribe"

RUN pnpm run build

# ---- runtime: prod deps + dist, non-root ----
FROM node:22.23.4-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d AS runtime

ARG USERNAME=blog
ARG USER_UID=1001
ARG USER_GID=$USER_UID

RUN groupadd --gid "$USER_GID" "$USERNAME" \
  && useradd --uid "$USER_UID" --gid "$USER_GID" -m "$USERNAME"

WORKDIR /blog

COPY --from=prod-deps /blog/node_modules ./node_modules
COPY --from=builder /blog/dist ./dist

USER $USERNAME

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["node", "/blog/dist/server/entry.mjs"]
