import { DBConnection } from '@/app/lib/db/DBConnection';
import { formatCompendiumJSON } from '@/app/lib/compendium/formatCompendiumJSON';
import type { NextRequest } from 'next/server';

export const revalidate = 3;

export async function GET(req: NextRequest) {
  const db = await DBConnection.getCompendiumDB();

  const ancestries = formatCompendiumJSON(
    await db.collection('ancestries').find().toArray()
  );

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
      };
    })
  );
}
