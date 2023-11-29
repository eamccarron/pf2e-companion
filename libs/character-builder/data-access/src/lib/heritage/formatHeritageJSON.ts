import type { Heritage } from '@pf2-companion/compendium-models';
export const formatHeritageJSON = (heritages: Array<Heritage>) =>
  heritages.map(
    ({
      name: heritageName,
      system: {
        description: { value: description },
      },
      _id: id,
    }) => ({
      id,
      primary: heritageName,
      secondary: description,
    })
  );
