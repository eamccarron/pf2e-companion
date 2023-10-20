import { SelectionContextProvider } from '@/components/providers/SelectionContextProvider';

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SelectionContextProvider>{children}</SelectionContextProvider>;
}
