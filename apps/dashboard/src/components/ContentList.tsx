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
  Typography,
} from '@mui/material';

import { SecondaryContent } from './SecondaryContent';

import type { Selection } from './providers/SelectionContextProvider';
import type { SelectionContext } from './providers/SelectionContextProvider';

type ListItem = Selection<any>;

export type ContentListProps = PropsWithChildren<{
  content: Array<ListItem>;
  selectionContext: React.Context<SelectionContext<any>>;
  secondaryContentLength?: number;
}>;

export default function ContentList({
  content,
  selectionContext,
  secondaryContentLength = 1,
}: ContentListProps) {
  const { selection, setSelection } =
    useContext<SelectionContext<any>>(selectionContext);

  const handleSelection = (content: ListItem) => setSelection(content);

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
              secondary={
                <React.Fragment>
                  <Typography component="span">
                    <SecondaryContent
                      secondary={content.secondary}
                      secondaryContentLength={secondaryContentLength}
                    />
                  </Typography>
                </React.Fragment>
              }
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
