#!/bin/bash -e
#
# Build a docker image using kaniko

/kaniko/executor \
  --context "${CI_PROJECT_DIR}" \
  --dockerfile "${CI_PROJECT_DIR}/$1/Dockerfile" \
  --destination "${CI_REGISTRY_IMAGE}/$2"