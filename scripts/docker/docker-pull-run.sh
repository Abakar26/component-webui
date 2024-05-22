#!/bin/bash
# The purpose of this file is to provide an easy way to quickly create a functional
# docker container for the component service. It pulls the main branch from
# github and compiles it for Java. After that it puts it into a Docker image and
# puts that image into a container automatically.

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

# make and access temporary directory where the main branch git repo will be cloned in
printf "Making temp dir and cloning $image_name into it...\n"
mkdir temp
cd temp

git clone https://github.com/adaptec/$image_name.git
cd $image_name

rev_num=$(cat package.json | grep -o  '"version": "[^"]*' | grep -o '[^"]*$') # gets version # from package.json
image_name_rev=$image_name:$rev_num # combine image name with revision number for docker image naming

printf "Building Docker image for $image_name...\n"
docker build -t $image_name_rev .

printf "Creating and running Docker container for $image_name...\n"
IMAGE_NAME_REV="$image_name_rev" docker compose up -d # run docker image using docker compose with custom env variable 

# clean up temp dir
printf "Cleaning up temp dir...\n"
cd ..
cd ..
rm -rf temp