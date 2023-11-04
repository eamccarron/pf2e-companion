import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemText,
  Typography,
} from '@mui/material';

import { SecondaryContent } from './SecondaryContent';
import type { Selection } from './SelectionContextProvider';

type ListItem = Selection<any>;

export type ContentListProps<T> = PropsWithChildren<{
  content: Selection<T>[];
  selection: Selection<T> | null;
  setSelection: React.Dispatch<React.SetStateAction<Selection<T> | null>>;
  secondaryContentLength?: number;
  maxHeight?: number | string;
}>;

export function ContentList<T>({
  content,
  selection,
  setSelection,
  secondaryContentLength = 1,
  maxHeight = '100%',
}: ContentListProps<T>) {
  const handleSelection = (content: ListItem) => setSelection(content);

  const ContentListItem = ({ content }: { content: ListItem }) => {
    return (
      <ListItem
        key={content.id}
        data-cy="content-list-item"
      >
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
            data-cy="content-list-button"
          >
            <ListItemText
              primary={content.primary}
              secondary={
                <Typography component="span">
                  <SecondaryContent
                    secondary={content.secondary}
                    secondaryContentLength={secondaryContentLength}
                  />
                </Typography>
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
        maxHeight: maxHeight,
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
      data-cy="content-list"
    >
      {content.map((content) => (
        <ContentListItem
          key={content.id}
          content={content}
        />
      )) ?? <React.Fragment key={0} />}
    </List>
  );
}
