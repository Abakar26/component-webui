#!/bin/bash
# this script goes through the process of docker image creation
# and turning that docker image into a funcitonal kubernetes pod

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

# use env substitution to determine image name and pod name within kubernetes object files
printf "Creating Kubernetes pod $image_name from previously created Docker image...\n"
export POD_NAME=$image_name
export IMAGE_NAME=$image_name_rev
export CICD_SUFFIX=''
envsubst < ./scripts/kubernetes/objects/kubernetes-pod.yml | kubectl apply -f -
unset POD_NAME
unset IMAGE_NAME
unset CICD_SUFFIX