#!/bin/bash -e
#
# Pushes a docker image to the gitlab container registry


if [[ ! -v CI ]]; then
  docker login registry.gitlab.com -u mccarronea -p "$(cat ~/.pki/git-lab-container-registry-token)"
fi

docker push "registry.gitlab.com/mccarronea/pf2e-companion/$1"