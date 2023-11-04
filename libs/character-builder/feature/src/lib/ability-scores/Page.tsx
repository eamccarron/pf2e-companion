import {
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { Suspense, useContext, useState } from 'react';

import {
  AncestrySelection,
  BackgroundSelection,
  AbilityScoreSelection,
} from '@pf2-companion/character-builder/ui';

import type { Selection } from '@pf2-companion/ui-selection';

import type {
  AncestryContent,
  BackgroundContent,
} from '@pf2-companion/character-builder/types';
import { CharacterCreationContext } from '../CharacterCreationContextProvider';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const Page = () => {
  const { ancestries, backgrounds } = useLoaderData<{
    ancestries: Selection<AncestryContent>[];
    backgrounds: Selection<BackgroundContent>[];
  }>();

  const [section, setSection] = useState<number>(0);
  const handleSectionChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSection(newValue);
  };

  return (
    <>
      <AbilityScoreSelection />

      <Divider />

      <Tabs
        value={section}
        onChange={handleSectionChange}
      >
        <Tab label="Ancestry" data-cy="ancestry-tab"/>
        <Tab label="Background" data-cy="background-tab"/>
      </Tabs>

      <TabPanel
        value={section}
        index={0}
      >
        <AncestrySelection content={ancestries} />
      </TabPanel>

      <TabPanel
        value={section}
        index={1}
      >
        <BackgroundSelection content={backgrounds} />
      </TabPanel>
    </>
  );
};
