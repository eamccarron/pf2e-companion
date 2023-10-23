import { SelectionContextProvider } from '@pf2-companion/ui-selection';
import { CharacterSelectionContext } from '../../components/character/CharacterSelectionContext';

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
