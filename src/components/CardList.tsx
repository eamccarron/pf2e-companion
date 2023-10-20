'use client';

import React, { useContext } from 'react';
import type { PropsWithChildren } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import { SelectionContext } from './providers/SelectionContextProvider';
import type { SelectionContextProps } from './providers/SelectionContextProvider';

export type CardListContent = {
  primary: string;
  id: string | number;
  secondary?: string;
  avatar?: JSX.Element;
  action?: JSX.Element;
  description?: string;
};

export type CardSelection = string | number | undefined;

export type CardListProps = PropsWithChildren<{
  content: Array<CardListContent>;
}>;

export default function CardList({ content }: CardListProps) {
  const { selectionID, setSelection } =
    useContext<SelectionContextProps>(SelectionContext);

  const handleSelection = (content: CardListContent) =>
    setSelection(content.id);

  const CardListItem = ({ content }: { content: CardListContent }) => {
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
            selected={selectionID === content.id}
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
