import { MongoClient, type Db } from 'mongodb';

const uri = process.env['DB_URI'];

export class DBConnection {
  private static instance: DBConnection;
  private client: MongoClient;

  private constructor() {
    console.log(uri);
    this.client = new MongoClient(uri ?? '');
  }

  private async init() {
    try {
      await this.client.connect();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public static async getConnection() {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
      await DBConnection.instance.init();
    }
    return this.instance.client;
  }

  public static async getCompendiumDB(): Promise<Db> {
    const connection = await this.getConnection();
    return connection.db('compendium');
  }
}
