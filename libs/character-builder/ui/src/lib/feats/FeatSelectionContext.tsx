import { createContext, useReducer, useState, useEffect, useMemo } from 'react';

import type {
  Context,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';

import type { Selection } from '@pf2-companion/ui-selection/types';
import type {
  FeatContent,
  FeatType,
} from '@pf2-companion/types/character-builder';

export type FeatAction = {
  type: 'ADD_FEAT' | 'ADD_LEVEL' | 'RESET';
  target: {
    level: number;
    feat?: Selection<FeatContent>;
    featType: FeatType;
  };
};

export type FeatSelection = Array<{
  class: Selection<FeatContent> | null;
  ancestry: Selection<FeatContent> | null;
  skill: Selection<FeatContent> | null;
  general: Selection<FeatContent> | null;
}>;

export type FeatReducer = (
  state: FeatSelection,
  action: FeatAction
) => FeatSelection;

export const featReducer: FeatReducer = (state, action) => {
  const targetIndex = action.target?.level - 1;
  switch (action.type) {
    case 'RESET':
      return state.map((value, index) => {
        if (index !== targetIndex) {
          return value;
        } else {
          const newSelection = { ...value };
          newSelection[action.target.featType] = null;

          return newSelection;
        }
      });
    case 'ADD_FEAT':
      return state.map((value, index) => {
        if (!action.target.feat || index !== targetIndex) {
          return value;
        } else {
          const newSelection = { ...value };
          newSelection[action.target.featType] = action.target.feat;
          return newSelection;
        }
      });
    case 'ADD_LEVEL':
      return [
        ...state,
        {
          class: null,
          ancestry: null,
          skill: null,
          general: null,
        },
      ];
    default:
      return state;
  }
};

export type FeatSelectionContextProps = {
  selection: FeatSelection;
  updateFeatDispatch: Dispatch<FeatAction>;
};

export const FeatSelectionContext = createContext<FeatSelectionContextProps>({
  selection: [],
  updateFeatDispatch: () => null,
});

export const FeatSelectionContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [featSelection, updateFeatDispatch] = useReducer<FeatReducer>(
    featReducer,
    Array.from({ length: 20 }, (_, i) => i + 1).map((_) => ({
      class: null,
      ancestry: null,
      skill: null,
      general: null,
    }))
  );

  return (
    <FeatSelectionContext.Provider
      value={{ selection: featSelection, updateFeatDispatch }}
    >
      {children}
    </FeatSelectionContext.Provider>
  );
};
