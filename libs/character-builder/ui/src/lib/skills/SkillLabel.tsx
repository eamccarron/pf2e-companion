import { Typography } from '@mui/material';
import { skillLabels } from '.';

import type { SkillIdentifier } from '@pf2-companion/types/compendium';

export const SkillLabel = ({
  skillIdentifier,
}: {
  skillIdentifier: SkillIdentifier;
}) => <Typography>{skillLabels[skillIdentifier]}</Typography>;
