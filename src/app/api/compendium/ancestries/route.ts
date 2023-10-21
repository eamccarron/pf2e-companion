import { DBConnection } from '@/app/lib/db/DBConnection';

export const revalidate = 3;

export async function GET() {
  const db = await DBConnection.getCompendiumDB();

  const ancestries = await db.collection('ancestries').find().toArray();

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
