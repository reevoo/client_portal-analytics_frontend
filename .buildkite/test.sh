#!/bin/sh
set -xe

bundle install 
yarn install
yarn run ci
