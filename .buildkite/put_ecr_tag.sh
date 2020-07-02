#!/bin/bash

if [ $# -ne 2 ]; 
    then echo "Please specify the REPO_NAME and COMMIT_TAG"
    exit 1
fi

REPO_NAME=$1
COMMIT_TAG=$2

MANIFEST=$(aws ecr batch-get-image \
	--repository-name ${REPO_NAME} \
	--image-ids imageTag=${COMMIT_TAG} \
	--query 'images[].imageManifest' \
	--output text)

aws ecr put-image \
	--repository-name ${REPO_NAME} \
	--image-tag prod${COMMIT_TAG} \
	--image-manifest "$MANIFEST"
