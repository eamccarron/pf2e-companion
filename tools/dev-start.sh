#!/bin/bash
#
# Starts a development environment

if ! command -v docker &> /dev/null; then
  echo 'ERROR: docker not found. Please install docker.'
  exit 1
fi

if ! docker compose version; then
  echo 'ERROR: docker compose not found. Please install docker compose.'
  exit 1
fi

npm ci
pm2 start 'pm2.config.js'