// import type { MongoRepository, ObjectLiteral } from 'typeorm';
import type { Model, Query } from 'mongoose';

export interface CompendiumMongoRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | undefined>;
}

export abstract class CompendiumRepository<T extends object> {
  constructor(private model: Model<T>) {}

  public findAll = async () => this.model.find();
  public findById = async (id: string) => this.model.findOne({ _id: id });

  public findByTraitName(trait: string): Query<T[], T> {
    return this.model
      .find({
        'system.traits.value': trait,
      })
      .collation({ locale: 'en', strength: 2 });
  }
}
