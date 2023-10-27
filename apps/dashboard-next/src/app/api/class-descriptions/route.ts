import { classDescriptions } from '@pf2-companion/character-builder/server';

export async function GET() {
  return Response.json(classDescriptions);
}
