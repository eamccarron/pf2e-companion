import { AbilityScores } from './AbilityScores';

import type { Character } from '@pf2-companion/types/character-builder';
import { Skills } from '../skills/SkillProficiencies';
import { Stack } from '@mui/material';

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
