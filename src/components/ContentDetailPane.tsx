'use client';

import React, { PropsWithChildren, useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Slide,
  Typography,
} from '@mui/material';
import { SelectionContext } from './providers/SelectionContextProvider';

interface ContentDetailPaneContentProps {
  selectionContext: React.Context<SelectionContext<any>>;
}

interface ContentDetailPaneProps extends ContentDetailPaneContentProps {
  slide: never;
  slideDirection: never;
}

interface ContentDetailPaneWithSlide extends ContentDetailPaneContentProps {
  slide: boolean;
  slideDirection: 'up' | 'left' | 'right' | 'down';
}

export function ContentDetailPane({
  children,
  selectionContext,
  ...slideProps
}:
  | PropsWithChildren<ContentDetailPaneProps>
  | PropsWithChildren<ContentDetailPaneWithSlide>) {
  const { selection } = useContext<SelectionContext<any>>(selectionContext);

  return (
    <Box sx={{ width: '100%' }}>
      <Slide
        in={selection !== null}
        direction={slideProps.slideDirection}
      >
        <Card>
          <CardHeader
            title={selection?.primary}
            avatar={selection?.avatar}
            subheader={(selection?.secondary ?? [])[0] ?? ''}
          />
          <CardContent>
            <>
              {children}
              {/* {selection?.description ? (
                <Typography variant="body2">{selection.description}</Typography>
              ) : (
                <></>
              )} */}
              <Typography variant="body2">{selection?.description}</Typography>
            </>
          </CardContent>
        </Card>
      </Slide>
    </Box>
  );

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
}
