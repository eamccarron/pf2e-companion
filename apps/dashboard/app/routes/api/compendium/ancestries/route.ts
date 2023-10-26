  import { DBConnection } from '@pf2-companion/db';
  import { formatCompendiumJSON } from '@pf2-companion/data-access-compendium';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

export const revalidate = 3;

export async function GET(req: any) {
  const db = await DBConnection.getCompendiumDB();

  // TODO: typing on data access layer for better typing here
  const ancestries: Array<any> = formatCompendiumJSON(
    await db.collection('ancestries').find().toArray()
  );

  return Response.json(ancestries);
}
