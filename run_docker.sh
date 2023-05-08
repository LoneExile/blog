#!/bin/bash

docker build -t loneexile/blog:latest .
docker-compose up -d --build
