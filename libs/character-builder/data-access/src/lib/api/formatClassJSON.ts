import type { ClassContent } from '@pf2-companion/types/character-builder';
import type { Class } from '@pf2-companion/types/compendium';

import { calculateAbilityBoosts } from './calculateAbilityBoosts';

interface ClassObject {
  content: ClassContent;
}

const calculateClassBoosts = (keyAbility: Array<string>) => {
  return keyAbility.length === 1
    ? { fixed: [keyAbility[0]] }
    : { restricted: [keyAbility] };
};

export const formatClassJSON = (classes: Array<Class>): Array<ClassObject> =>
  classes.map(
    ({
      name,
      system: {
        description: { value: description },
        traits: { rarity },
        keyAbility: { value: keyAbility },
        hp,
      },
      id,
    }: Class) => ({
      primary: name,
      secondary: [`Starting HP: ${hp}`, `Key Ability: ${keyAbility}`],
      description,
      id,
      content: {
        hp,
        rarity,
        boosts: calculateClassBoosts(keyAbility),
      },
    })
  );
