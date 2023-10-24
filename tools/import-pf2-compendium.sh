#!/bin/bash -e
#
# Imports the pathfinder 2e compendium JSON from the Foundry VTT game system into a local mongo database

PF2_COMPENDIUM_REPO='https://github.com/foundryvtt/pf2e.git'

if ! command -v mongoimport > /dev/null 2>&1; then
    echo "mongoimport not found. Please install mongo tools."
    exit 1
fi

# Create a temporary working directory for the compendium import
cd "$(mktemp -d -t pf2-compendium-import-XXXXXX)" || exit

# Sparse checkout of the pf2 compendium
git clone -n --depth=1 --filter=tree:0 "${PF2_COMPENDIUM_REPO}" .
git sparse-checkout set --no-cone \
  packs/feats \
  packs/classes \
  packs/ancestries \
  packs/backgrounds 
git checkout

# Drop current compendium to ensure a clean copy is imported
mongosh compendium --eval "db.dropDatabase()"

# Import the compendium into the local mongo database

echo 'Importing compendium into local mongo database...'

# Feats
for file in packs/feats/*; do
  mongoimport --db compendium --collection feats --file "$file" > /dev/null 2>&1
done
echo 'Finished importing feats'

# Classes
for file in packs/classes/*; do
  mongoimport --db compendium --collection classes --file "$file" > /dev/null 2>&1
done
echo 'Finished importing classes'

# Ancestries
for file in packs/ancestries/*; do
  mongoimport --db compendium --collection ancestries --file "$file" > /dev/null 2>&1
done
echo 'Finished importing classes'

# Backgrounds
for file in packs/backgrounds/*; do
  mongoimport --db compendium --collection backgrounds --file "$file" > /dev/null 2>&1
done
echo 'Finished importing backgrounds'
