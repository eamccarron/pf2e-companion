export type { Ancestry } from './Ancestry';
export type { Feat } from './Feat';

import { Schema, model, connect } from 'mongoose';
import type { AbilityScoreName, SkillName, Rarity } from '../../../types';
import { initialize } from 'next/dist/server/lib/render-server';

export interface Boost {
  value: Array<AbilityScoreName>;
}

export interface Description {
  value: string;
}

export interface BackgroundSystem {
  boosts: {
    [key: number]: Boost;
  };
  description: {
    value: string;
  };
  rules: [];
  trainedLore: string;
  trainedSkills: {
    value: Array<SkillName>;
  };
  traits: {
    rarity: Rarity;
    value: Array<any>;
  };
}

export interface Background {
  _id: string;
  name: string;
  type: 'background';
  system: BackgroundSystem;
}

export const BackgroundSystemSchema = new Schema<BackgroundSystem>({
  boosts: {
    type: Map,
    of: {
      value: new Schema<Boost>({ value: [String] }),
    },
  },
  description: new Schema<Description>({ value: String }),
});

export const BackgroundSchema = new Schema<Background>({
  name: String,
  system: BackgroundSystemSchema,
  type: String,
});
