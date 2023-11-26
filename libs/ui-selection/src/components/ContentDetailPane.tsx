import React, { type PropsWithChildren } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Slide,
  Typography,
} from '@mui/material';

import { Selection } from './SelectionContextProvider';
import { HTMLContent } from '@pf2-companion/ui-general';
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';

interface ContentDetailPaneProps<T> {
  selection: Selection<T> | null;
  slide: boolean;
  slideDirection: 'up' | 'left' | 'right' | 'down';
  raised?: boolean;
  color?: string;
  outlined?: boolean;
}

export function ContentDetailPane<T>({
  children,
  selection,
  raised = false,
  ...slideProps
}: PropsWithChildren<ContentDetailPaneProps<T>>) {
  return (
    <Slide
      in={selection !== null}
      direction={slideProps.slideDirection}
    >
      <Box>
        <Card
          raised={raised}
          elevation={raised ? 4 : 0}
          sx={{
            borderRadius: 6,
            bgcolor: `surfaceVariant.main`,
            // color: `on${color[0].toUpperCase()}${color.slice(1)}Container.main`,
            color: 'onSurfaceVariant.main',
            p: 1,
          }}
        >
          <CardHeader
            data-cy="detail-pane-header"
            title={selection?.primary}
            subheader={selection?.secondary}
            sx={{
              whiteSpace: 'pre-line',
              // color: `on${color[0].toUpperCase()}${color.slice(
              //   1
              // )}Container.main`,
            }}
          />
          <CardContent data-cy="detail-pane-content">
            <Box sx={{ color: 'onSurfaceVariant.main' }}>
              {children}
              {children && selection?.description && <Divider />}

              {selection?.description && (
                <HTMLContent
                  content={selection.description}
                  // styles={(theme) => ({
                  //   body: { color: theme.palette.onSurfaceVariant.main },
                  // })}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
}

// TODO: Paramaterize slide in animation
// const containerRef = React.useRef<HTMLElement>(null);
// const DetailPaneContent = ({ children }: PropsWithChildren<unknown>) => (
//   <Card>
//     <CardHeader
//       title={selectedItem?.primary}
//       avatar={selectedItem?.avatar}
//       subheader={selectedItem?.secondary}
//     />
//     <CardContent>{children}</CardContent>
//   </Card>
// );

// return:
// <Box sx={{ width: '100%' }}>
//   {slideProps.slide ? (
//     <Slide
//       direction={slideProps.slideDirection}
//       in={selectionID !== null}
//     >
//       <DetailPaneContent>{children}</DetailPaneContent>
//     </Slide>
//   ) : (
//     <DetailPaneContent>{children}</DetailPaneContent>
//   )}
// </Box>
