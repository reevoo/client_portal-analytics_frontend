#!/bin/bash

set -xe

if [ -z "$1" ]
then
  echo "No stage supplied"
  exit 1
fi

bundle install
rm -rf node_modules
npm install --force
npm run deploy:$1
