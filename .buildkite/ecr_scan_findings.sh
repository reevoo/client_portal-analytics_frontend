#!/bin/bash

if [ $# -ne 2 ];
    then echo "Please specify the REPO_NAME and COMMIT_TAG"
    exit 1
fi

REPO_NAME=$1
COMMIT_TAG=$2

echo "The image scan returned these findings:"
aws ecr describe-image-scan-findings \
  --repository-name $REPO_NAME \
  --image-id imageTag=$COMMIT_TAG \
  | jq .imageScanFindings.findingSeverityCounts

CRITICAL_ISSUES=$(aws ecr describe-image-scan-findings \
  --repository-name $REPO_NAME \
  --image-id imageTag=$COMMIT_TAG \
  | jq .imageScanFindings.findingSeverityCounts.CRITICAL)

echo "CRITICAL_ISSUES is $CRITICAL_ISSUES"

# The findings may be empty/null
if [ -z "${CRITICAL_ISSUES}" ] || [ "${CRITICAL_ISSUES}" = "null" ]; then
	echo "No vulnerabilities were detected in this image, so it can be deployed"
	exit 0
fi	

# The findings may or may not contain CRITICAL vulnerabilities
if [ -n "${CRITICAL_ISSUES}" ] && [ "${CRITICAL_ISSUES}" -gt "0" ]; then
	echo "Critical vulnerabilities were detected in this image, so it cannot be deployed"
	exit 1
else
	echo "No Critical vulnerabilities were detected in this image, so it can be deployed"
	exit 0
fi
