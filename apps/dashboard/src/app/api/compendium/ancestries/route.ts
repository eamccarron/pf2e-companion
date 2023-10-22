import { DBConnection } from '@/lib/db/DBConnection';
import { formatCompendiumJSON } from '@/lib/db/formatCompendiumJSON';
import type { NextRequest } from 'next/server';
import type { Ancestry } from '@/types/Ancestry';

export const revalidate = 3;

export async function GET(req: NextRequest) {
  const db = await DBConnection.getCompendiumDB();

  const ancestries: Array<any> = formatCompendiumJSON(
    await db.collection('ancestries').find().toArray()
  ) as Array<any>;

  // const searchParams = req.nextUrl.searchParams;
  // const query = searchParams.get('suggested_for_character');

  return Response.json(
    ancestries.map((ancestry) => {
      const { value: description } = ancestry.system.description;

      return {
        ...ancestry,
        system: {
          ...ancestry.system,
          description: description
            .substring(0, description.indexOf('@'))
            .replace(/<[^>]*>?/gm, ''),
        },
      } as Ancestry;
    })
  );
}
