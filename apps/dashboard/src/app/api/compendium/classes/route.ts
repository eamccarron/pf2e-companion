import { DBConnection } from '@pf2-companion/db';

export async function GET() {
  const db = await DBConnection.getCompendiumDB();

  const classes = await db.collection('classes').find().toArray();
  return Response.json(classes);
}
