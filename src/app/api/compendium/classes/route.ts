import { DBConnection } from '@/app/lib/db/DBConnection';

export async function GET() {
  const db = await DBConnection.getCompendiumDB();

  const classes = await db.collection('classes').find().toArray();
  return Response.json(classes);
}
