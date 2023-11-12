'use client';

import React, { createContext, useState } from 'react';
import type { Selection } from '@pf2-companion/types/ui-selection';
export type { Selection };

export type selectionID = string | number | null;

export type SelectionContext<T> = {
  selection: Selection<T> | null;
  setSelection: React.Dispatch<React.SetStateAction<Selection<T> | null>>;
};

export function createSelectionContext<T>(): React.Context<
  SelectionContext<T>
> {
  return createContext<SelectionContext<T>>({
    selection: null,
    setSelection: () => null,
  });
}

type SelectionContextProviderProps<T> = {
  children: React.ReactNode;
  Context: React.Context<SelectionContext<T>>;
};

export function SelectionContextProvider<T>({
  children,
  Context,
}: React.PropsWithChildren<SelectionContextProviderProps<T>>) {
  const [selection, setSelection] = useState<Selection<T> | null>(null);

  return (
    <Context.Provider value={{ selection, setSelection }}>
      {/* TODO: type children and use {children({selection}) instead of context} */}
      {children}
    </Context.Provider>
  );
}
