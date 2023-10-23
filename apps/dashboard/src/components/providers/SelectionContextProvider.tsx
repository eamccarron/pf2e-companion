'use client';

import React, { createContext, useState } from 'react';

export type selectionID = string | number | null;

export interface Selection<T> {
  primary: string;
  id: string | number;
  secondary?: Array<string>;
  avatar?: JSX.Element;
  action?: JSX.Element;
  description?: string;
  content: T;
}

export type SelectionContext<T> = {
  selection: Selection<T> | null;
  setSelection: React.Dispatch<React.SetStateAction<Selection<T> | null>>;
};

export function createSelectionContext<T>(): React.Context<
  SelectionContext<T>
> {
  return createContext<SelectionContext<T>>({
    selection: null,
    setSelection: () => {},
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
