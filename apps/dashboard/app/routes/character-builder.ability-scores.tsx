// Server
import { fetchCompendium } from '../server/fetchCompendium.server';

// Client
import {
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { Suspense, useState } from 'react';

import {
  type AncestrySelectionContent as Content,
  AncestrySelection,
  BackgroundSelection,
  AbilityScoreSelection,
} from '@pf2-companion/character-builder';

import {
  formatAncestryJSON,
  formatBackgroundJSON,
} from '@pf2-companion/character-builder/server';

import type {
  Ancestry,
  Background,
} from '@pf2-companion/data-access-compendium';

export const loader = async (): Promise<{
  ancestries: Content;
  backgrounds: Content;
}> => {
  const ancestryResponse = await fetchCompendium('ancestries');
  const ancestries = (await ancestryResponse.json()) as Array<Ancestry>;

  const backgroundResponse = await fetchCompendium('backgrounds');
  const backgrounds = (await backgroundResponse.json()) as Array<Background>;

  return {
    ancestries: formatAncestryJSON(ancestries),
    backgrounds: formatBackgroundJSON(backgrounds),
  };
};

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default function CharacterBuilderAbilityScores() {
  const { ancestries, backgrounds } = useLoaderData<{
    ancestries: Content;
    backgrounds: Content;
  }>();

  const [section, setSection] = useState<number>(0);
  const handleSectionChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSection(newValue);
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <AbilityScoreSelection />

      <Divider />

      <Tabs
        value={section}
        onChange={handleSectionChange}
      >
        <Tab label="Ancestry" />
        <Tab label="Background" />
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
    </Suspense>
  );
}
