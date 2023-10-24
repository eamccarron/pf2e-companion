import type { Model, Schema } from 'mongoose';
import { MongoRepository } from './MongoRepository';

export abstract class CollectionRepository<T> extends MongoRepository {
  protected model: Model<T>;

  constructor(schema: Schema<T>, modelName: string, dbName: string) {
    super(dbName);
    console.log(schema.constructor.name);
    this.model = this.db.model<T>(modelName, schema);
  }

  public findAll(): Promise<Array<T>> {
    return this.model.find().exec();
  }
}
