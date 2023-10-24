#!/bin/bash -e
#
# Push a built test-db container to the gitlab container registry

docker login registry.gitlab.com -u mccarronea -p "$(cat ~/.pki/git-lab-container-registry-token)"
docker push registry.gitlab.com/mccarronea/pf2e-companion/test-db:latest