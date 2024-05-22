#!/bin/bash
# This bash script creates a docker container out of a preexisting image

set -e

printf "Enter in the name of the Docker image to be turned into a container (with tag):"
read image_name_rev

# navigate to root repo directory
cd ..
cd ..

# create docker container
printf "Creating Docker container for $image_name_rev...\n"
IMAGE_NAME_REV="$image_name_rev" docker compose up -d # create docker image using docker compose with custom env variable 