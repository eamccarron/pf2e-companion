import React from 'react';
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
import type { Selection } from './SelectionContextProvider';

type ListItem = Selection<any>;

export type ContentListProps<T> = PropsWithChildren<{
  content: Array<ListItem>;
  selection: Selection<T> | null;
  setSelection: React.Dispatch<React.SetStateAction<Selection<T> | null>>;
  secondaryContentLength?: number;
}>;

export function ContentList<T>({
  content,
  selection,
  setSelection,
  secondaryContentLength = 1,
}: ContentListProps<T>) {
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
