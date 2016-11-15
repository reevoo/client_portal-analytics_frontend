#!/bin/bash

set -xe

if [ -z "$1" ]
then
  echo "No stage supplied"
  exit 1
fi

bundle install
rm -rf node_modules
yarn install
yarn run deploy:$1
