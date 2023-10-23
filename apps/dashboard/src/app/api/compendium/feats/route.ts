import { DBConnection } from '@pf2-companion/db';

export async function GET() {
  const db = await DBConnection.getCompendiumDB();

  const feats = await db.collection('feats').find().toArray();
  return Response.json(feats);
}