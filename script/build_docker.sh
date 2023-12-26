#!/bin/bash

cd ../
docker build -t loneexile/blog:latest .
docker push loneexile/blog:latest
