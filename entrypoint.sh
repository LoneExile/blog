#!/bin/sh

# Download the ZIP file
curl -X POST -H "Content-Type: application/json" \
    --data '{"remotePath": "/"}' \
    -o objects.zip \
    "http://voidsync:8080/download-all"

# Extract the ZIP file to the desired directory
unzip -o objects.zip -d /blog/src/content/blogs

# Remove the downloaded ZIP file
rm objects.zip

cd /blog || exit
pnpm run build

# Run the blog service
exec "$@"
