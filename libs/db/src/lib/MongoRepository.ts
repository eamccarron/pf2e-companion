import mongoose from 'mongoose';

const local_uri = 'mongodb://localhost:27017';

export abstract class MongoRepository {
  private connection: ReturnType<typeof mongoose.createConnection>;

  constructor(dbName: string) {
    this.connection = mongoose.createConnection(`${local_uri}/${dbName}`);
  }

  protected get db() {
    return this.connection;
  }
}
