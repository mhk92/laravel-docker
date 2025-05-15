#!/bin/bash

while ! test -f ./public/hot; do sleep 1; done
chown node:node ./public/hot


