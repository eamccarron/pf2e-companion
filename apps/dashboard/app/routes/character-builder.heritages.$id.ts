import { LoaderFunctionArgs } from "@remix-run/node";
import { heritageLoader } from "@pf2-companion/character-builder/feature/server";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => params?.id ? heritageLoader(params.id) : [];