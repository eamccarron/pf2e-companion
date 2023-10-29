// Server
import { fetchCompendium } from '../server/fetchCompendium.server';

// Client
import { Stack } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';

import {
  AncestryList,
  AncestryDetailPane,
  RarityFilter,
} from '@pf2-companion/character-builder';

import type { Selection } from '@pf2-companion/ui-selection';
import type { Ancestry } from '@pf2-companion/data-access-compendium/types';
import { useState } from 'react';

export const loader = async () => {
  const res = await fetchCompendium('ancestries');
  return res.json();
};

type Content = Selection<Ancestry & { rarity: string }>;

export default function SelectAncestryAndAbilityScores() {
  const ancestries: Array<Ancestry> = useLoaderData<Ancestry[]>();
  const [listContent, setListContent] = useState<Content[]>([]);
  const [initialContent, setInitialContent] = useState<Content[]>([]);

  useEffect(() => {
    const content = ancestries.map(
      ({
        name,
        system: {
          description: { value: description },
          hp,
          traits: { rarity: rarity },
        },
        _id: id,
      }) =>
        ({
          primary: name,
          secondary: [`Starting HP: ${hp}`],
          description,
          id,
          content: { rarity },
        } as any)
    );
    setListContent(content);
    setInitialContent(content);
  }, [ancestries]);

  const handleReset = () => {
    setListContent(initialContent);
  };

  return (
    <>
      <RarityFilter
        content={listContent}
        setContent={setListContent}
        initialContent={initialContent}
      />
      <Stack
        direction="row"
        spacing={2}
      >
        <AncestryList content={listContent} />
        <AncestryDetailPane />
      </Stack>
    </>
  );
}
