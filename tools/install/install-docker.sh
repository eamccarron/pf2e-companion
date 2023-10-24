#!/bin/bash -e
#
# Installing docker on mantic is a mess because docker hasn't updated their repo yet >:(

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker.io

sudo service docker start

# Install compose manually
DOCKER_CONFIG="${DOCKER_CONFIG:-$HOME/.docker}"
mkdir -p "${DOCKER_CONFIG}/cli-plugins"
curl -SL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o "${DOCKER_CONFIG}/cli-plugins/docker-compose"
chmod +x "${DOCKER_CONFIG}/cli-plugins/docker-compose"

sudo groupadd docker || echo 'Found existing group docker, not adding new group'

sudo usermod -aG docker "$USER"
newgrp docker

# Quick test to make sure docker is running
docker compose version
docker run hello-world