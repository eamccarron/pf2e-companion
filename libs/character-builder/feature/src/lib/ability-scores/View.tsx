'use client';
import { Tabs, Tab, Box, Divider, Skeleton } from '@mui/material';
import { ReactNode, Suspense, useContext, useEffect, useState } from 'react';

import { AncestrySelection, AncestrySelectionContext } from '../ancestry';

import { BackgroundSelection } from '../background/BackgroundSelection';

import type { Selection } from '@pf2-companion/ui-selection';

import {
  AncestryContent,
  BackgroundContent,
} from '@pf2-companion/types/character-builder';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const AbilityScoreView = ({
  data,
  heritageSelection,
}: {
  data: {
    ancestries: Selection<AncestryContent>[];
    backgrounds: Selection<BackgroundContent>[];
  };
  heritageSelection: ReactNode;
}) => {
  const { ancestries, backgrounds } = data;

  const [section, setSection] = useState<number>(0);
  const handleSectionChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSection(newValue);
  };

  const { selection: ancestrySelection } = useContext(AncestrySelectionContext);

  return (
    <>
      <Divider />

      <Tabs
        value={section}
        onChange={handleSectionChange}
      >
        <Tab
          label="Ancestry"
          data-cy="ancestry-tab"
        />
        <Tab
          label="Background"
          data-cy="background-tab"
        />
      </Tabs>

      <TabPanel
        value={section}
        index={0}
      >
        <AncestrySelection content={ancestries}>
          {heritageSelection}
        </AncestrySelection>
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
