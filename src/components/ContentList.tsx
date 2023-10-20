'use client';

import React, { useContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import type { Selection } from './providers/SelectionContextProvider';
import type { SelectionContext } from './providers/SelectionContextProvider';

type ListItem = Selection<any>;

export type ContentListProps = PropsWithChildren<{
  content: Array<ListItem>;
  selectionContext: React.Context<SelectionContext<any>>;
}>;

export default function ContentList({
  content,
  selectionContext,
}: ContentListProps) {
  const { selection, setSelection } =
    useContext<SelectionContext<any>>(selectionContext);

  const handleSelection = (content: ListItem) => setSelection(content);

  useEffect(() => {
    setSelection(content[0] ?? null);
  }, [content, setSelection]);

  const CardListItem = ({ content }: { content: ListItem }) => {
    return (
      <ListItem key={content.id}>
        <Box
          sx={{
            borderRadius: 6,
            width: '100%',
            backgroundColor: 'surface.main',
          }}
        >
          <ListItemButton
            selected={selection?.id === content.id}
            sx={{ borderRadius: 6 }}
            onClick={() => handleSelection(content)}
          >
            {content.avatar ? (
              <ListItemAvatar>{content.avatar}</ListItemAvatar>
            ) : (
              <></>
            )}

            <ListItemText
              primary={content.primary}
              secondary={content.secondary}
              sx={{
                color: 'onSurface.main',
              }}
            />
          </ListItemButton>
        </Box>
      </ListItem>
    );
  };

  return (
    <List
      sx={{
        width: '100%',
        maxHeight: '100%',
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      {content.map((content) => (
        <CardListItem
          key={content.id}
          content={content}
        />
      )) ?? <React.Fragment key={0} />}
    </List>
  );
}
