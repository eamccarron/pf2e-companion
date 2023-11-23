#!/bin/bash -e
#
# Builds a container image for the db service

# Create a fixture dataset from live development database

# Build image
docker build -t registry.gitlab.com/mccarronea/pf2e-companion/ci-runner:latest .