import type { AbilityScore } from './types';

export type AncestryBoostAction =
  | {
      type: 'ADD' | 'REMOVE';
      target: AbilityScore;
    }
  | {
      type: 'SET_FIXED';
      target: Array<AbilityScore>;
    };

export type AncestryBoostState = Partial<{
  str: boolean;
  dex: boolean;
  con: boolean;
  int: boolean;
  wis: boolean;
  cha: boolean;
}>;

export const ancestryBoostReducer = (
  state: AncestryBoostState,
  action: AncestryBoostAction
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