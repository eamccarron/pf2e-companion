import { createContext, useReducer, useState, useEffect } from 'react';
import type {
  Context,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import type { AbilityScore, BoostContent } from './types';

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

interface AttributeSelection {
  content: {
    boosts: BoostContent;
  };
}

export type BoostSelectionProps = {
  selection: AttributeSelection | null;
  boosts: BoostSelection;
  boostDispatch: Dispatch<BoostAction>;
  label: string;
};

export type RestrictedBoostAction = {
  type: AbilityScore | 'initialize';
  target: number;
};

type RestrictedBoostReducer = (
  state: Array<AbilityScore | ''>,
  action: RestrictedBoostAction
) => Array<AbilityScore | ''>;

export type AbilityScoreSelectionContextProps = {
  boostDispatch: Dispatch<BoostAction>;
  boostState: BoostSelection;
  fixedBoosts: Array<AbilityScore>;
  restrictedBoosts: Array<AbilityScore | null>;
  restrictedOptions: Array<AbilityScore[]>;
  freeBoostsAvailable: number;
  setFreeBoostsAvailable: Dispatch<SetStateAction<number>>;
  restrictedBoostDispatch: Dispatch<RestrictedBoostAction>;
};

export const createAbilityScoreSelectionContext = () =>
  createContext<AbilityScoreSelectionContextProps>({
    boostDispatch: () => null,
    boostState: {},
    fixedBoosts: [],
    restrictedBoosts: [],
    restrictedOptions: [[]],
    freeBoostsAvailable: 0,
    setFreeBoostsAvailable: () => null,
    restrictedBoostDispatch: () => null,
  });

export const AbilityScoreSelectionContextProvider = ({
  AbilityScoreContext,
  children,
  selection,
}: PropsWithChildren<{
  AbilityScoreContext: Context<AbilityScoreSelectionContextProps>;
  selection: AttributeSelection | null;
}>) => {
  const [boosts, boostDispatch] = useReducer(boostReducer, {
    str: false,
    dex: false,
    con: false,
    int: false,
    wis: false,
    cha: false,
  });

  const restrictedBoostReducer: RestrictedBoostReducer = (state, action) => {
    if (action.type === 'initialize') {
      return new Array(action.target).fill('');
    }

    if (state[action.target] !== null) {
      boostDispatch({
        type: 'REMOVE',
        target: state[action.target] as AbilityScore,
      });
    }

    boostDispatch({
      type: 'ADD',
      target: action.type as AbilityScore,
    });

    return state.map((value, index) =>
      index === action.target ? action.type : value
    );
  };

  const [fixed, setFixed] = useState<Array<AbilityScore>>([]);
  const [restrictedOptions, setRestrictedOptions] = useState<
    Array<AbilityScore[]>
  >([]);

  const [freeBoostsAvailable, setFreeBoostsAvailable] = useState<number>(0);
  const [restrictedBoosts, restrictedBoostDispatch] =
    useReducer<RestrictedBoostReducer>(restrictedBoostReducer, [null, null]);

  useEffect(() => {
    console.log('Selection changed: ', selection);
    setFixed(selection?.content.boosts?.fixed ?? []);
    setRestrictedOptions(selection?.content.boosts?.restricted ?? []);
    setFreeBoostsAvailable(selection?.content.boosts?.free ?? 0);
    boostDispatch({ type: 'RESET', target: [] });
    restrictedBoostDispatch({
      type: 'initialize',
      target: selection?.content.boosts?.restricted?.length ?? 0,
    });
  }, [selection, boostDispatch, restrictedBoostDispatch]);

  useEffect(() => {
    console.log(fixed);
    boostDispatch({
      type: 'SET_FIXED',
      target: fixed as Array<AbilityScore>,
    });
  }, [fixed, boostDispatch]);

  useEffect(() => {
    console.log(restrictedBoosts);
  }, [restrictedBoosts]);

  useEffect(() => {
    console.log('freeBoostsAvailable', freeBoostsAvailable);
  }, [freeBoostsAvailable]);

  return (
    <AbilityScoreContext.Provider
      value={{
        boostDispatch,
        boostState: boosts,
        fixedBoosts: fixed,
        restrictedBoosts,
        restrictedOptions,
        freeBoostsAvailable,
        setFreeBoostsAvailable,
        restrictedBoostDispatch,
      }}
    >
      {children}
    </AbilityScoreContext.Provider>
  );
};
