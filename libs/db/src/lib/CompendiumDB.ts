import { DataSource } from 'typeorm';

export const CompendiumDB = new DataSource({
  type: 'mongodb',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  database: 'compendium',
});
