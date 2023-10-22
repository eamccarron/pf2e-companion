import { DBConnection } from '@/app/lib/db/DBConnection';

export async function GET() {
  const db = await DBConnection.getCompendiumDB();

  const feats = await db.collection('feats').find().toArray();
  return Response.json(feats);
}
