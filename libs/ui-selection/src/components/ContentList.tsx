import React, { useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Box,
  ListItemText,
  Typography,
} from '@mui/material';

import type { Selection } from './SelectionContextProvider';

type ListItem = Selection<any>;

type ListContentRenderer = ({ content }: { content: ListItem }) => JSX.Element;

export type ContentListProps<T> = PropsWithChildren<{
  'data-cy'?: string;
  content: Selection<T>[];
  selection: Selection<T> | null;
  setSelection: React.Dispatch<Selection<T> | null>;
  maxHeight?: number | string;
  renderListItem?: ListContentRenderer;
  secondaryAction?: JSX.Element | null;
}>;

export function ContentList<T>({
  content,
  selection,
  setSelection,
  maxHeight = '100%',
  renderListItem,
  secondaryAction = null,
  ...props
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
        <Box
          sx={{
            borderRadius: 6,
            width: '100%',
            bgcolor: isSelected(content.id)
              ? 'tertiaryContainer.main'
              : 'surfaceContainer.main',
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
            {renderListItem ? (
              renderListItem({ content })
            ) : (
              <ListItemText
                primary={content.primary}
                secondary={content.secondary}
                sx={{
                  whiteSpace: 'pre-line',
                }}
              />
            )}
          </ListItemButton>
        </Box>
      </ListItem>
    );
  };

  return (
    <List
      data-cy={props['data-cy'] ?? "content-list"}
      sx={{
        width: '100%',
        maxHeight: maxHeight,
        overflow: 'auto',
      }}
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
