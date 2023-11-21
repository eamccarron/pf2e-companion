import { CharacterView as Character } from '@pf2-companion/character-builder/ui';

export const CharacterView = () => {
  return (
    <Character
      character={{
        abilityScores: [
          {
            ability: 'str',
            abilityScore: 10,
          },
          {
            ability: 'dex',
            abilityScore: 10,
          },
          {
            ability: 'con',
            abilityScore: 10,
          },

          {
            ability: 'int',
            abilityScore: 10,
          },

          {
            ability: 'wis',
            abilityScore: 10,
          },

          {
            ability: 'cha',
            abilityScore: 10,
          },
        ],
        characterSkills: {
          acr: {
            modifier: 3,
            proficiency: 1,
          },
          arc: {
            modifier: 3,
            proficiency: 1,
          },
          ath: {
            modifier: 3,
            proficiency: 1,
          },
          cra: {
            modifier: 3,
            proficiency: 1,
          },
          dec: {
            modifier: 3,
            proficiency: 1,
          },
          dip: {
            modifier: 3,
            proficiency: 1,
          },
          itm: {
            modifier: 3,
            proficiency: 1,
          },
          lor: {
            modifier: 3,
            proficiency: 1,
          },
          med: {
            modifier: 3,
            proficiency: 1,
          },
          nat: {
            modifier: 3,
            proficiency: 1,
          },
          occ: {
            modifier: 3,
            proficiency: 1,
          },
          prf: {
            modifier: 3,
            proficiency: 1,
          },
          rel: {
            modifier: 3,
            proficiency: 1,
          },
          soc: {
            modifier: 3,
            proficiency: 1,
          },
          ste: {
            modifier: 3,
            proficiency: 1,
          },
          sur: {
            modifier: 3,
            proficiency: 1,
          },
          thi: {
            modifier: 3,
            proficiency: 1,
          },
        },
      }}
    />
  );
};
