import { createContext, useReducer } from 'react';
import type { Context, Dispatch, PropsWithChildren } from 'react';
import type { AbilityScore } from './types';

export type BoostAction =
  | {
      type: 'ADD' | 'REMOVE';
      target: AbilityScore;
    }
  | {
      type: 'SET_FIXED';
      target: Array<AbilityScore>;
    }
  | {
      type: 'RESET';
      target: [];
    };

export type BoostSelection = Partial<{
  str: boolean;
  dex: boolean;
  con: boolean;
  int: boolean;
  wis: boolean;
  cha: boolean;
}>;

export type BoostReducer = (
  state: BoostSelection,
  action: BoostAction
) => BoostSelection;

export type AbilityScoreSelectionContextProps = {
  boostDispatch: Dispatch<BoostAction>;
  boostState: BoostSelection;
};

export const boostReducer: BoostReducer = (state, action) => {
  if (action.type === 'SET_FIXED') {
    const fixedBoosts = Object.fromEntries(
      action.target?.map((boost) => [boost, true]) ?? []
    );
    return fixedBoosts;
  }

  switch (action.type) {
    case 'ADD':
      return { ...state, [action.target]: true };
    case 'REMOVE':
      return { ...state, [action.target]: false };
    case 'RESET':
      return {
        ...Object.fromEntries(
          Object.entries(state).map(([key]) => [key, false])
        ),
      };
    default:
      return state;
  }
};

export const createAbilityScoreSelectionContext = () =>
  createContext<AbilityScoreSelectionContextProps>({
    boostDispatch: () => null,
    boostState: {},
  });

export const AbilityScoreSelectionContextProvider = ({
  context,
  children,
}: PropsWithChildren<{
  context: Context<AbilityScoreSelectionContextProps>;
}>) => {
  const [boostState, boostDispatch] = useReducer(boostReducer, {
    str: false,
    dex: false,
    con: false,
    int: false,
    wis: false,
    cha: false,
  });

  return (
    <context.Provider value={{ boostState, boostDispatch }}>
      {children}
    </context.Provider>
  );
};

export const BackgroundAbilityScoreContext =
  createAbilityScoreSelectionContext();

export const AncestryAbilityScoreContext = createAbilityScoreSelectionContext();
