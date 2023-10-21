import { MongoClient } from 'mongodb';

const uri: string = 'mongodb://localhost:27017/mydatabase';

export class DBConnection {
  private static instance: DBConnection;
  private client: MongoClient;

  private constructor() {
    this.client = new MongoClient(uri);
  }

  private async init() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public static async getConnection() {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
    }
    await DBConnection.instance.init();
    return this.instance.client;
  }

  public static async getCompendiumDB() {
    const connection = await this.getConnection();
    return connection.db('compendium');
  }
}
