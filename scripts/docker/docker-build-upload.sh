#!/bin/bash
# The purpose of this file is to provide an easy way to quickly create a functional
# docker container and upload it. It compiles the Java
# source code then builds the docker image. After that it puts that newly created
# docker image into a container

set -e

# get git repo name
image_name=$(basename `git rev-parse --show-toplevel`)
full_name=ghcr.io/adaptec/ias/$image_name

# navigate to the root repo directory
cd ..
cd ..

printf "Building Docker image for $image_name...\n"
docker build -t ghcr.io/adaptec/ias/$image_name .

printf "Pushing Docker image to registry...\n"
docker push $full_name