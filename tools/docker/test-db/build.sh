#!/bin/bash -e
#
# Builds a container image for the test-db service

# Create a fixture dataset from live development database
[[ -d './fixtures' ]] && rm -rf ./fixtures

mongoexport --db compendium --collection feats --out ./fixtures/compendium/feats.json
mongoexport --db compendium --collection ancestries --out ./fixtures/compendium/ancestries.json
mongoexport --db compendium --collection backgrounds --out ./fixtures/compendium/backgrounds.json
mongoexport --db compendium --collection classes --out ./fixtures/compendium/classes.json

# Build image
docker build -t registry.gitlab.com/mccarronea/pf2e-companion/test-db:latest .

# Cleanup
rm -rf ./fixtures