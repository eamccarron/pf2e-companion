import React, { useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemText,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { SecondaryContent } from './SecondaryContent';
import type { Selection } from './SelectionContextProvider';

type ListItem = Selection<any>;

type ListContentRenderer = ({ content }: { content: ListItem }) => JSX.Element;

export type ContentListProps<T> = PropsWithChildren<{
  content: Selection<T>[];
  selection: Selection<T> | null;
  setSelection: React.Dispatch<Selection<T> | null>;
  maxHeight?: number | string;
  renderListItem?: ListContentRenderer;
}>;

export function ContentList<T>({
  content,
  selection,
  setSelection,
  maxHeight = '100%',
  renderListItem,
}: ContentListProps<T>) {
  const handleSelection = (content: ListItem) => setSelection(content);
  const isSelected = useCallback(
    (id: string | number) => selection?.id === id,
    [selection?.id]
  );

  const ContentListItem = ({ content }: { content: ListItem }) => {
    return (
      <ListItem
        key={content.id}
        data-cy="content-list-item"
      >
        {renderListItem ? (
          renderListItem({ content })
        ) : (
          <Box
            sx={{
              borderRadius: 6,
              width: '100%',
              bgcolor: isSelected(content.id)
                ? 'tertiaryContainer.main'
                : 'surface.main',
              color: isSelected(content.id)
                ? 'onTertiaryContainer.main'
                : 'onSurface.main',
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
                secondary={content.secondary}
                sx={{
                  whiteSpace: 'pre-line',
                }}
              />
            </ListItemButton>
          </Box>
        )}
      </ListItem>
    );
  };

  return (
    <List
      sx={{
        width: '100%',
        maxHeight: maxHeight,
        overflow: 'auto',
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
