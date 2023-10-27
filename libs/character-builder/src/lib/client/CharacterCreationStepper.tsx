'use client';

import { useContext } from 'react';
import { Stepper, Step, StepLabel, Button, Stack } from '@mui/material';

import {
  steps,
  CharacterCreationContext,
} from './CharacterCreationContextProvider';

export const CharacterCreationStepper = () => {
  const { activeStep, handleNext, handleBack, completed /*, setCompleted */ } =
    useContext(CharacterCreationContext);

  // const handleStep = (step: number) => () => {
  //   setCompleted(
  //     new Set(Array.from(completed.values()).filter((x) => x < step))
  //   );
  // };

  return (
    <Stepper activeStep={activeStep}>
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
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Stack>
    </Stepper>
  );
};
