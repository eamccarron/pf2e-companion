import { SelectionContextProvider } from '@/components/providers/SelectionContextProvider';
import { CharacterSelectionContext } from '@/components/character/CharacterSelectionContext';

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
