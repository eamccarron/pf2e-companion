import type {
  ClassContent,
  AbilityScore,
} from '@pf2-companion/types/character-builder';
import type { Class } from '@pf2-companion/compendium-models';
import type { Selection } from '@pf2-companion/types/ui-selection';

const calculateClassBoosts = (keyAbility: Array<string>) => {
  return keyAbility.length === 1
    ? {
        restricted: [],
        fixed: [keyAbility[0]] as Array<AbilityScore>,
        free: 0,
      }
    : {
        restricted: [keyAbility] as Array<AbilityScore[]>,
        fixed: [],
        free: 0,
      };
};

export const formatClassJSON = (
  classes: Array<Class>
): Selection<ClassContent>[] =>
  classes.map(
    ({
      name,
      system: {
        description: { value: description },
        traits: { rarity },
        keyAbility: { value: keyAbility },
        trainedSkills,
        skillIncreaseLevels: { value: skillIncreaseLevels },
        hp,
      },
      _id: id,
    }: Class) => ({
      primary: name,
      secondary: `Starting HP: ${hp} \n Key Ability: ${keyAbility}`,
      description,
      id,
      content: {
        hp,
        rarity,
        boosts: calculateClassBoosts(keyAbility),
        trainedSkills: {
          skills: trainedSkills?.value,
          additional: trainedSkills?.additional,
        },
        skillIncreaseLevels,
      },
    })
  );
