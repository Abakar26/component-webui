#!/bin/bash
# this script creates a service for a pod on the kubernetes system

set -e

printf "Enter in new Service name & selector:\n"
read service_name
service_name=$(echo $service_name | tr -d '\n')

# use env substitution to determine service name within kubernetes object files
printf "Creating Kubernetes service..\n"
export POD_NAME=$service_name
envsubst < ./objects/kubernetes-service.yml | kubectl apply -f -
unset POD_NAME