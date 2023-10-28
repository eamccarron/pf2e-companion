import { Schema, model, connect } from 'mongoose';
import type { AbilityScoreName, SkillName, Rarity } from '../../../types';
import { initialize } from 'next/dist/server/lib/render-server';


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
