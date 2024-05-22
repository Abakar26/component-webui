#!/bin/bash
# The purpose of this file is to provide an easy way to quickly create a functional
# kubernetes image for the specified service. It compiles the Java
# source code then builds the docker image.

set -e

# get git repo name
image_name=$(basename `git rev-parse --show-toplevel`)

# navigate to root repo directory
cd ..
cd ..

printf "Pointing local Docker client to Minikube Docker daemon...\n"
eval $(minikube docker-env) # point docker client to minikube's docker daemon

printf "Getting $image_name version number...\n"
rev_num=$(cat package.json | grep -o  '"version": "[^"]*' | grep -o '[^"]*$') # gets version # from package.json
image_name_rev=$image_name:$rev_num # combine image name with revision number for docker image naming

printf "Building Docker image for $image_name...\n"
docker build -t $image_name_rev .

printf "Docker image $image_name_rev has been built for Kubernetes.\n"