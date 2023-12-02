import { useCallback, useMemo, useState } from 'react';

import { Box, ListItemIcon, ListItemText, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { SkillTrainingSelection, SkillIncreaseSelection } from '../skills';
import { ContentList } from '@pf2-companion/ui-selection';
import type { Selection } from '@pf2-companion/types/ui-selection';

export const Skills = ({
  skillTrainingSelectionsAvailable,
  level,
  skillIncreaseLevels,
}: {
  skillTrainingSelectionsAvailable: number;
  level: number;
  skillIncreaseLevels: number[];
}) => {
  const [selectionsCompleted, setSelectionsCompleted] = useState<string[]>([]);

  const options: Selection<undefined>[] = useMemo(
    () => [
      {
        id: 'skillTraining',
        primary: 'First level skill training',
        content: undefined,
      },
      ...skillIncreaseLevels
        .filter((l) => l <= level)
        .map((level) => ({
          id: level.toString(),
          primary: `Skill increase (level ${level})`,
          content: undefined,
        })),
    ],
    [level, skillIncreaseLevels]
  );

  const [selectedOption, setOptionSelected] =
    useState<Selection<undefined> | null>(options[0]);

  const handleSkillIncreaseCompleted = (completed: boolean, level: number) =>
    completed
      ? setSelectionsCompleted([...selectionsCompleted, level.toString()])
      : setSelectionsCompleted(
          selectionsCompleted.filter(
            (selection) => selection !== level.toString()
          )
        );

  const handleSkillTrainingCompleted = (completed: boolean) =>
    completed
      ? setSelectionsCompleted([...selectionsCompleted, 'skillTraining'])
      : setSelectionsCompleted(
          selectionsCompleted.filter(
            (selection) => selection !== 'skillTraining'
          )
        );

  const renderSkillOption = useCallback(
    ({ content }: { content: Selection<undefined> }) => (
      <>
        <ListItemIcon>
          {selectionsCompleted.includes(content.id as string) ? (
            <CheckCircleIcon data-cy="feat-selected-icon" />
          ) : (
            <RadioButtonUncheckedIcon data-cy="feat-unselected-icon" />
          )}
        </ListItemIcon>

        <ListItemText primary={content.primary} />
      </>
    ),
    [selectionsCompleted]
  );

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'space-around'}
        mt={1}
      >
        <Box
          sx={{
            bgcolor: 'surfaceContainerLow.main',
            color: 'onSurface.main',
            borderRadius: '12px',
            width: '20%',
          }}
        >
          <ContentList<undefined>
            content={options}
            renderListItem={renderSkillOption}
            selection={selectedOption}
            setSelection={setOptionSelected}
          />
        </Box>

        <Box
          sx={{
            bgcolor: 'surfaceContainerLow.main',
            color: 'onSurface.main',
            borderRadius: '12px',
            width: '80%',
          }}
        >
          {selectedOption?.id === 'skillTraining' ? (
            <SkillTrainingSelection
              selectionsAvailable={skillTrainingSelectionsAvailable}
              setSelectionCompleted={handleSkillTrainingCompleted}
            />
          ) : (
            options.length > 1 && (
              <SkillIncreaseSelection
                setSelectionCompleted={(completed) =>
                  handleSkillIncreaseCompleted(
                    completed,
                    Number(selectedOption?.id)
                  )
                }
                level={Number(selectedOption?.id)}
              />
            )
          )}
        </Box>
      </Stack>
    </Box>
  );
};
