#!/bin/bash -e
#
# Builds a container image for the db service

# Create a fixture dataset from live development database
[[ -d './fixtures' ]] && rm -rf ./fixtures

packs=("classes" "ancestries" "backgrounds" "spells" "heritages" "equipment" "feats")

for pack in "${packs[@]}"; do
  mkdir -p "./fixtures/compendium/${pack}"
  mongoexport --db compendium --collection "${pack}" --out "./fixtures/compendium/${pack}.json"
done

# Build image
docker build -t registry.gitlab.com/mccarronea/pf2e-companion/db:latest .

# Cleanup
rm -rf ./fixtures