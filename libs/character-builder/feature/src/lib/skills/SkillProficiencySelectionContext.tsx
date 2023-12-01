import type { SkillProficiencies } from '@pf2-companion/types/character-builder';
import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';

export type SkillAction = {
  type: 'TRAIN' | 'UNTRAIN';
  target: { level: number; skill: keyof SkillProficiencies };
};

// const increaseProficiencyRank = (rank: ProficiencyRank) => {
//   switch (rank) {
//     case ProficiencyRank.UNTRAINED:
//       return ProficiencyRank.TRAINED;
//     case ProficiencyRank.TRAINED:
//       return ProficiencyRank.EXPERT;
//     case ProficiencyRank.EXPERT:
//       return ProficiencyRank.MASTER;
//     case ProficiencyRank.MASTER:
//       return ProficiencyRank.LEGENDARY;
//     default:
//       return rank;
//   }
// };

// const decreaseProficiencyRank = (rank: ProficiencyRank) => {
//   switch (rank) {
//     case ProficiencyRank.LEGENDARY:
//       return ProficiencyRank.MASTER;
//     case ProficiencyRank.MASTER:
//       return ProficiencyRank.EXPERT;
//     case ProficiencyRank.EXPERT:
//       return ProficiencyRank.TRAINED;
//     case ProficiencyRank.TRAINED:
//       return ProficiencyRank.UNTRAINED;
//     default:
//       return rank;
//   }
// };

export type SkillReducer = (
  state: SkillProficiencies,
  action: SkillAction
) => SkillProficiencies;

export const skillReducer: SkillReducer = (state, action) => {
  const { skill } = action.target;
  switch (action.type) {
    case 'TRAIN':
      return {
        ...state,
        [skill]: state[skill].concat(action.target.level),
      };
    case 'UNTRAIN':
      return {
        ...state,
        [skill]: state[skill].filter((level) => level !== action.target.level),
      };
    default:
      return state;
  }
};
// export const skillReducer: SkillReducer = (state, action) => {
//   switch (action.type) {
//     case 'TRAIN':
//       return {
//         ...state,
//         [action.target]: increaseProficiencyRank(
//           state[action.target] ?? ProficiencyRank.UNTRAINED
//         ),
//       };
//     case 'UNTRAIN':
//       return {
//         ...state,
//         [action.target]: decreaseProficiencyRank(
//           state[action.target] ?? ProficiencyRank.UNTRAINED
//         ),
//       };
//     default:
//       return state;
//   }
// };

export type SkillProficiencySelectionContext = {
  selection: Partial<SkillProficiencies>;
  updateSkillProficiencyDispatch: Dispatch<SkillAction>;
};

export const SkillProficiencySelectionContext =
  createContext<SkillProficiencySelectionContext>({
    selection: {},
    updateSkillProficiencyDispatch: () => null,
  });

export const SkillProficiencySelectionContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [selection, updateSkillProficiencyDispatch] = useReducer<SkillReducer>(
    skillReducer,
    {
      acr: [],
      arc: [],
      ath: [],
      cra: [],
      dec: [],
      dip: [],
      itm: [],
      med: [],
      nat: [],
      occ: [],
      prf: [],
      rel: [],
      soc: [],
      ste: [],
      sur: [],
      thi: [],
    }
  );

  // const trainSkill = (level: number, skill: keyof SkillProficiencies) => {
  //   updateSkillProficiencyDispatch({
  //     type: 'TRAIN',
  //     target: { level, skill },
  //   });
  // };

  // const untrainSkill = (level: number, skill: keyof SkillProficiencies) => {
  //   updateSkillProficiencyDispatch({
  //     type: 'UNTRAIN',
  //     target: { level, skill },
  //   });
  // };

  return (
    <SkillProficiencySelectionContext.Provider
      value={{ selection, updateSkillProficiencyDispatch }}
    >
      {children}
    </SkillProficiencySelectionContext.Provider>
  );
};
