#!/bin/bash

# TODO: puplish to docker hub then use watchtower to update

if [ -z "$TIMESTAMP" ]; then
    TIMESTAMP=$(date +%s)
    export TIMESTAMP
    NO_CACHE="--no-cache"
else
    NO_CACHE=""
fi

docker-compose build $NO_CACHE
docker-compose up -d
