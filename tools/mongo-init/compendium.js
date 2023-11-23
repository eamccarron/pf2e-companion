// Database iniitialization script for MongoDB compendium

db.classes.createIndex(
  { name: 1 },
  { collation: { locale: 'en', strength: 1 } }
);
