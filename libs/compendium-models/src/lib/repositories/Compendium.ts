// import type { MongoRepository, ObjectLiteral } from 'typeorm';
import type { Model } from 'mongoose';

export interface CompendiumMongoRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | undefined>;
}

export abstract class CompendiumRepository<T extends object> {
  constructor(private repository: Model<T>) {}

  public findAll = async () => this.repository.find();
  public findById = async (id: string) => this.repository.findOne({ _id: id });
}
