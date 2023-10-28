
export abstract class MongoRepository {

  constructor(dbName: string) {
    this.connection = mongoose.createConnection(
      `${process.env['DB_URI']}/${dbName}`
    );
  }

  protected get db() {
    return this.connection;
  }
}
