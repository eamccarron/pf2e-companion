'use client';

import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Box, Card, CardContent, CardHeader, Slide } from '@mui/material';
import {
  SelectionContext,
  SelectionContextProps,
} from './providers/SelectionContextProvider';

type ListDetailPaneContent = {
  primary: string;
  secondary?: string;
  id: string | number;
  avatar?: JSX.Element;
  action?: JSX.Element;
  description?: string;
};

interface ListDetailPaneContentProps {
  content: Array<ListDetailPaneContent>;
}

interface ListDetailPaneProps extends ListDetailPaneContentProps {
  slide: never;
  slideDirection: never;
}

interface ListDetailPaneWithSlide extends ListDetailPaneContentProps {
  slide: boolean;
  slideDirection: 'up' | 'left' | 'right' | 'down';
}

export function ListDetailPane({
  children,
  content,
  ...slideProps
}:
  | PropsWithChildren<ListDetailPaneProps>
  | PropsWithChildren<ListDetailPaneWithSlide>) {
  const { selectionID, setSelection } =
    useContext<SelectionContextProps>(SelectionContext);

  useEffect(() => {
    setSelection(content[0]?.id ?? null);
  }, [content, setSelection]);

  const selectedItem = useMemo(
    () => content.find((item) => item.id === selectionID),
    [selectionID, content]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Slide
        in={selectionID !== null}
        direction={slideProps.slideDirection}
      >
        <Card>
          <CardHeader
            title={selectedItem?.primary}
            avatar={selectedItem?.avatar}
            subheader={selectedItem?.secondary}
          />
          <CardContent>{children}</CardContent>
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
