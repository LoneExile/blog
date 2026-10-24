# Base images are pinned by multi-arch index digest. To bump one:
#   crane digest node:<tag>        (then update both the tag and the digest)
# Node must satisfy astro's engines (>=22.23.4) and match .nvmrc.

# ---- base: node + the pnpm version pinned in package.json ("packageManager") ----
FROM node:26.12.0@sha256:45a2bf9d9300e9cf47ecb375e38447c140c45ef5fbae869c430475b05b98d86e AS base

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
FROM node:26.12.0-slim@sha256:e556a144463cc8dc53afe8de6d2fa0db5c132fd39ffa232c17641bd40df2bf11 AS runtime

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
