import { CollectionRepository } from '@pf2-companion/db';
import { initializeSchemaMiddleware } from '../middleware';

export abstract class CompendiumRepository<T> extends CollectionRepository<T> {
  constructor(schema: Schema<T>, modelName: string) {
    // initializeSchemaMiddleware(schema);
    super(schema, modelName, 'compendium');
  }
}