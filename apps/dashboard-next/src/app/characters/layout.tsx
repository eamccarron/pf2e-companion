import { SelectionContextProvider } from '@pf2-companion/ui-selection';
import { CharacterSelectionContext } from './CharacterSelectionContext';

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectionContextProvider Context={CharacterSelectionContext}>
      {children}
    </SelectionContextProvider>
  );
}
