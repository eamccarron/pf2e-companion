// import { DBConnection } from '@/lib/db/DBConnection';
// import { formatCompendiumJSON } from '@/lib/db/formatCompendiumJSON';
import { DBConnection } from '@pf2-companion/db';
import { formatCompendiumJSON } from '@pf2-companion/data-access-compendium';
import type { NextRequest } from 'next/server';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

export const revalidate = 3;

export async function GET(req: NextRequest) {
  const db = await DBConnection.getCompendiumDB();

  const ancestries: Array<any> = formatCompendiumJSON(
    await db.collection('ancestries').find().toArray()
  ) as Array<any>;

  return Response.json(ancestries);
}
