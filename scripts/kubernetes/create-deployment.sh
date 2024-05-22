#!/bin/bash
# this script creates a deployment from a prexisting image on the kubernetes system

set -e

printf "Enter in Docker image name & tag to be turned into deployment:\n"
read image_name_rev
image_name_rev=$(echo $image_name_rev | tr -d '\n') # remove line end from read variable

printf "Enter in new deployment name:\n"
read pod_name
pod_name=$(echo $pod_name | tr -d '\n')

# use env substitution to determine image name and deployment name within kubernetes object files
printf "Creating Kubernetes deployment from previously created Docker image...\n"
export POD_NAME=$pod_name
export IMAGE_NAME=$image_name_rev
export CICD_SUFFIX=''
envsubst < ./objects/kubernetes-deployment.yml | kubectl apply -f -
unset POD_NAME
unset IMAGE_NAME
unset CICD_SUFFIX