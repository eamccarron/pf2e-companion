#!/bin/bash

# Import compendium fixtures

# Feats

cd /fixtures/compendium || exit
packs=("classes" "ancestries" "backgrounds" "spells" "heritages" "equipment" "feats")

for pack in "${packs[@]}"; do
  mongoimport --db compendium --collection "${pack}" --file "./${pack}.json"
done