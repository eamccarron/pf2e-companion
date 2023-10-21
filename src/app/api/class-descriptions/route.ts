import classDescriptions from '@/../public/class-descriptions.json';

export async function GET() {
  return Response.json(classDescriptions);
}
