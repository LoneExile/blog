#!/bin/sh

mkdir -p /blog/tmp/
rm -rf /blog/tmp/*

curl -X POST -H "Content-Type: application/json" \
    --data '{"remotePath": "/", "removeIcon": true}' \
    -o objects.zip \
    "http://voidsync:8080/download-all"

unzip -o objects.zip -d /blog/tmp/

obsidian-convertor convert '/blog/tmp/SecondBrain/ Blog' '/blog/tmp/SecondBrain/ Assets/ image' /blog/src/content/blogs/ /blog/public/images/blogs/ /images/blogs/

rm objects.zip

cd /blog || exit
pnpm run build

# Kill the process running on port 3000
# kill $(lsof -t -i:3000)

node ./dist/server/entry.mjs
