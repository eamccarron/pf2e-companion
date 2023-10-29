import type { MongoRepository, ObjectLiteral } from 'typeorm';

export interface CompendiumMongoRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | undefined>;
}

export abstract class CompendiumRepository<T extends ObjectLiteral> {
  constructor(
    private repository: MongoRepository<T>
  ) {}

  public findAll = async () => this.repository.find()
  public findById = async (id: string) => this.repository.findOneBy({ id })
}