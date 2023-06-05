FROM node:18.15.0

WORKDIR /blog

RUN apt-get update && \
  apt-get install -y git curl unzip

COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install Go
RUN git clone --depth 1 https://github.com/udhos/update-golang \
  && cd update-golang \
  && ./update-golang.sh \
  && cd .. \
  && rm -rf update-golang

RUN npm i -g pnpm
RUN pnpm i

ENV PATH="/usr/local/go/bin:${PATH}"
RUN go install github.com/LoneExile/obsidian-convertor@v0.1.3

ENV PATH="/root/go/bin:${PATH}"

ENTRYPOINT ["/entrypoint.sh"]

COPY entrypoint.sh /entrypoint.sh
COPY . .

# RUN pnpm run build

ENV HOST=0.0.0.0
ENV PORT=3001

EXPOSE 3001

# CMD ["node", "./dist/server/entry.mjs"]
