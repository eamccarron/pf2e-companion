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

# Compendium packs needed for our compendium data model
packs=("classes" "ancestries" "backgrounds" "spells" "heritages" "equipment" "feats")

# Sparse checkout of the required compendium packs from the pf2e foundry module repo
checkout_targets=""

for target in "${packs[@]}"; do
  checkout_targets="${checkout_targets} packs/${target}"
done

git clone -n --depth=1 --filter=tree:0 "${PF2_COMPENDIUM_REPO}" .
git sparse-checkout set --no-cone "${checkout_targets}"
git checkout

# Drop current compendium to ensure a clean copy is imported
mongosh compendium --eval "db.dropDatabase()"

# Import the compendium into the local mongo database

echo 'Importing compendium into local mongo database...'


for pack in "${packs[@]}"; do
  echo "Importing ${pack}..."
  for file in packs/"${pack}"/*; do
    mongoimport --db compendium --collection "${pack}" --file "$file" > /dev/null 2>&1
  done
  echo "Finished importing ${pack}"
done