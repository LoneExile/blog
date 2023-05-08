#!/bin/bash

docker build -t loneexile/blog:latest .
docker push loneexile/blog:latest
