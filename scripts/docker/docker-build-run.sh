#!/bin/bash
# The purpose of this file is to provide an easy way to quickly create a functional
# docker container for the component. It compiles the Java
# source code then builds the docker image. After that it puts that newly created
# docker image into a container

set -e

# get git repo name
image_name=$(basename `git rev-parse --show-toplevel`)

printf "Would you like the previous $image_name container to be removed? (Y/N):\n"
read del_choice

if [[ $del_choice == 'Y' ]] || [[ $del_choice == 'y' ]] 
then
    printf "Deleting old $image_name container..."
    docker rm -f $image_name
fi

# navigate to root repo directory
cd ..
cd ..

rev_num=$(cat package.json | grep -o  '"version": "[^"]*' | grep -o '[^"]*$') # gets version # from package.json
image_name_rev=$image_name:$rev_num # combine image name with revision number for docker image naming

printf "Building Docker image for $image_name...\n"
docker build -t $image_name_rev .

printf "Creating & running Docker container for $image_name...\n"
IMAGE_NAME_REV="$image_name_rev" docker compose up -d # create docker image using docker compose with custom env variable 