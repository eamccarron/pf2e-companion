'use client';

import React, { createContext, useState } from 'react';

export type selectionID = string | number | null;

export type SelectionContextProps = {
  selectionID: selectionID;
  setSelection: React.Dispatch<React.SetStateAction<selectionID>>;
};

export const SelectionContext = createContext<SelectionContextProps>({
  selectionID: null,
  setSelection: () => {},
});

export function SelectionContextProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const [selectionID, setSelection] = useState<selectionID>(null);

  return (
    <SelectionContext.Provider value={{ selectionID, setSelection }}>
      {children}
    </SelectionContext.Provider>
  );
}
