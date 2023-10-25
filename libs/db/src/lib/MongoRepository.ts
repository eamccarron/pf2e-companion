import mongoose from 'mongoose';

export abstract class MongoRepository {
  private connection: ReturnType<typeof mongoose.createConnection>;

  constructor(dbName: string) {
    this.connection = mongoose.createConnection(
      `${process.env['DB_URI']}/${dbName}`
    );
  }

  protected get db() {
    return this.connection;
  }
}
