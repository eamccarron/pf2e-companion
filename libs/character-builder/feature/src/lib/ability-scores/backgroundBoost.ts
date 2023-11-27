import type { AbilityScore } from './types';

export type BackgroundBoostAction =
  | {
      type: 'ADD' | 'REMOVE';
      target: AbilityScore;
    }
  | {
      type: 'SET_FIXED';
      target: Array<AbilityScore>;
    };

export type BackgroundBoostState = Partial<{
  str: boolean;
  dex: boolean;
  con: boolean;
  int: boolean;
  wis: boolean;
  cha: boolean;
}>;

export const ancestryBoostReducer = (
  state: BackgroundBoostState,
  action: BackgroundBoostAction
) => {
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
    default:
      return state;
  }
};
