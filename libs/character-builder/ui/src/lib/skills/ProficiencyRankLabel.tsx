import { Typography } from '@mui/material';
import { proficiencyRankLabels } from '.';

import { ProficiencyRank } from '@pf2-companion/types/character-builder';

export const ProficiencyRankLabel = ({
  proficiencyRank,
}: {
  proficiencyRank: ProficiencyRank;
}) => <Typography>{proficiencyRankLabels[proficiencyRank]}</Typography>;
