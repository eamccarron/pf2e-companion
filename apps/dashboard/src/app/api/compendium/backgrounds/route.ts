import type { NextRequest } from 'next/server';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';

import { BackgroundRepository } from '@pf2-companion/data-access-compendium';

export const revalidate = 3;

export async function GET(req: NextRequest) {
  const backgroundRepository = BackgroundRepository.getInstance();
  const backgrounds = await backgroundRepository.findAll();
  console.log(backgrounds);
  // TODO: typing on data access layer for better typing here
  return Response.json(backgrounds);
}
