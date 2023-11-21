import { AbilityScores } from './AbilityScores';

import type { AbilityScores as CharacterAbilityScores } from '@pf2-companion/types/character-builder';
import type { CharacterSkills } from './types/CharacterSkills';
import { Skills } from './Skills';
import { Stack } from '@mui/material';

export type Character = {
  abilityScores: CharacterAbilityScores;
  characterSkills: CharacterSkills;
};

export const CharacterView = ({ character }: { character: Character }) => (
  <>
    <Stack
      direction="row"
      justifyContent="space-evenly"
    >
      <AbilityScores abilityScores={character.abilityScores} />
    </Stack>

    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      width="20%"
      mt={1}
    >
      <Skills characterSkills={character.characterSkills} />
    </Stack>
  </>
);
