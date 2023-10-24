#!/bin/bash

# Import compendium fixtures

# Feats
for file in /fixtures/compendium/feats/*; do
  mongoimport --db compendium --collection feats --file "$file" > /dev/null 2>&1
done

# Classes
for file in /fixtures/compendium/classes/*; do
  mongoimport --db compendium --collection classes --file "$file" > /dev/null 2>&1
done

for file in /fixtures/compendium/ancestries/*; do
  mongoimport --db compendium --collection ancestries --file "$file" > /dev/null 2>&1
done