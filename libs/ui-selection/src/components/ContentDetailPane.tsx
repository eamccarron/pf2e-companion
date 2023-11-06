import React, { type PropsWithChildren } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Slide,
  Typography,
} from '@mui/material';

import { Selection } from './SelectionContextProvider';
import { HTMLContent } from '@pf2-companion/ui-general';

interface ContentDetailPaneProps<T> {
  selection: Selection<T> | null;
  slide: boolean;
  slideDirection: 'up' | 'left' | 'right' | 'down';
}

export function ContentDetailPane<T>({
  children,
  selection,
  ...slideProps
}: PropsWithChildren<ContentDetailPaneProps<T>>) {
  return (
    <Box sx={{ width: '100%' }}>
      <Slide
        in={selection !== null}
        direction={slideProps.slideDirection}
      >
        <Card>
          <CardHeader
            data-cy="detail-pane-header"
            title={selection?.primary}
            subheader={selection?.secondary}
            sx={{
              whiteSpace: 'pre-line',
            }}
          />
          <CardContent data-cy="detail-pane-content">
            {selection?.description && (
              <HTMLContent content={selection.description} />
            )}
            {children}
          </CardContent>
        </Card>
      </Slide>
    </Box>
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
