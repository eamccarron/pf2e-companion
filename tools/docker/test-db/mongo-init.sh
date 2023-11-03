#!/bin/bash

# Import compendium fixtures

# Feats

cd /fixtures/compendium || exit
mongoimport --db compendium --collection feats --file "./feats.json"

# Classes
mongoimport --db compendium --collection classes --file "./classes.json"

# Ancestries
mongoimport --db compendium --collection ancestries --file "./ancestries.json"
