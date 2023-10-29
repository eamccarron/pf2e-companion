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

interface ContentDetailPaneProps<T> {
  selection: Selection<T> | null;
  selectionDetail?: (selection: Selection<T> | null) => React.ReactNode;
  slide: boolean;
  slideDirection: 'up' | 'left' | 'right' | 'down';
}

export function ContentDetailPane<T>({
  children,
  selection,
  selectionDetail = () => undefined,
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
            title={selection?.primary}
            subheader={(selection?.secondary ?? [])[0] ?? ''}
            data-cy="detail-pane-header"
          />
          <CardContent data-cy="detail-pane-content">
            <>
              {children}
              {selectionDetail(selection)}
              <Typography variant="body2">{selection?.description}</Typography>
            </>
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
