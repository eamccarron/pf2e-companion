import { SelectionContextProvider } from '@pf2-companion/ui-selection';
import { CharacterSelectionContext } from './CharacterSelectionContext';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren<unknown>) => (
  <SelectionContextProvider Context={CharacterSelectionContext}>
    {children}
  </SelectionContextProvider>
);

export default Layout;
