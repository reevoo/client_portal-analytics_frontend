#!/bin/bash

set -xe

PROJECT_NAME=$(basename ${PWD})
CONTAINER_VERSION=0.0.1
AWS_CREDENTIALS=${HOME}/.aws

test -d ${AWS_CREDENTIALS} || (echo "Error - ${AWS_CREDENTIALS} does not exist" ; exit 1)

if [ -z "$1" ]
  then
    echo "No stage supplied"
    exit 1
  else
    docker run -v ${AWS_CREDENTIALS}:/root/.aws -v ${PWD}:/app/ -it quay.io/reevoo/client_portal-analytics_frontend-build:${CONTAINER_VERSION} /app/deploy.sh $1
fi

