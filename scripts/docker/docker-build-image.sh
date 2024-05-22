#!/bin/bash
# This bash script creates a docker image of the current component

set -e

printf "Enter name of final Docker image with or without tag (leave empty for default repo name):\n"
read image_name 

if [[ $image_name == '' ]] # check if image_name is empty
then
    printf "Using default repo name...\n"
    # get git repo name
    image_name=$(basename `git rev-parse --show-toplevel`) # override read variable
    
    printf "Getting $image_name version number...\n"
    rev_num=$(cat package.json | grep -o  '"version": "[^"]*' | grep -o '[^"]*$') # gets version # from package.json
    image_name=$image_name:$rev_num
fi

# navigate to root repo directory
cd ..
cd ..

printf "Building Docker image for $image_name...\n"
docker build -t $image_name .

printf "Building finished for Docker image: $image_name\n"