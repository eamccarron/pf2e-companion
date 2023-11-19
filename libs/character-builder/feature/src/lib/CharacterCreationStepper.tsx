'use client';

import { useContext, useEffect, useMemo } from 'react';
import { Stepper, Step, StepLabel, Button, Stack } from '@mui/material';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { CharacterCreationContext } from './CharacterCreationContextProvider';
import {
  AncestrySelectionContext,
  ClassSelectionContext,
} from '@pf2-companion/character-builder/ui';

export const CharacterCreationStepper = ({
  steps,
}: {
  steps: Array<{ title: string; route: string }>;
}) => {
  const router = useRouter();
  const url = useSearchParams();
  const pathname = usePathname();

  const { activeStep, handleNext, handleBack, completed /*, setCompleted */ } =
    useContext(CharacterCreationContext);

  const searchParams: Record<string, string> = useMemo(() => {
    switch (activeStep) {
      case 0:
        return {
          className: url.get('className') ?? '',
        } as Record<string, string>;
      case 1:
        return {
          className: url.get('className') ?? '',
          ancestryId: url.get('ancestryId') ?? '',
        } as Record<string, string>;
      case 2:
        return {
          ancestryId: url.get('ancestryId') ?? '',
          className: url.get('className') ?? '',
          level: url.get('level') ?? '1',
        } as Record<string, string>;
      default:
        return {} as Record<string, string>;
    }
  }, [url, activeStep]);

  const { selection: classSelection } = useContext(ClassSelectionContext);
  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);

  const onNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleNext();
  };

  // Update params when ancestry selection is changed
  useEffect(() => {
    if (ancestrySelection?.id) {
      router.replace(
        `${pathname}?${new URLSearchParams({
          ...searchParams,
          ancestryId: ancestrySelection?.id.toString() ?? '',
        })}`
      );
    }
  }, [router, ancestrySelection, searchParams, pathname]);

  // Update params when class selection is changed
  useEffect(() => {
    if (classSelection) {
      router.replace(
        `${pathname}?${new URLSearchParams({
          ...searchParams,
          className: classSelection.primary.toLowerCase() ?? '',
        })}`
      );
    }
  }, [router, classSelection, searchParams, pathname]);

  return (
    <Stepper
      activeStep={activeStep}
      data-cy="character-creation-stepper"
    >
      {steps.map(({ title, route }, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: { optional?: React.ReactNode } = {};
        if (completed.has(index)) {
          stepProps.completed = true;
        }
        return (
          <Step
            key={title}
            {...stepProps}
          >
            <StepLabel
              {...labelProps}
              onClick={handleNext}
            >
              {title}
            </StepLabel>
          </Step>
        );
      })}

      <Stack
        spacing={1}
        direction="row"
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          data-cy="character-creation-back"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNextStep}
          data-cy="character-creation-next"
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Stack>
    </Stepper>
  );
};
