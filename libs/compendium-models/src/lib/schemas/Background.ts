import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type BackgroundDocument = HydratedDocument<Background>;

import {
  AbilityScoreModifiers,
  Description,
  TrainedSkills,
  Traits,
} from './System';

export class BackgroundSystem {
  @Prop(AbilityScoreModifiers)
  boosts: AbilityScoreModifiers;

  @Prop(Description)
  description: Description;

  @Prop(AbilityScoreModifiers)
  rules: [];

  @Prop()
  trainedLore: string;

  @Prop(TrainedSkills)
  trainedSkills: TrainedSkills;

  @Prop(Traits)
  traits: Traits;

  constructor(
    boosts: AbilityScoreModifiers,
    description: Description,
    rules: [],
    trainedLore: string,
    trainedSkills: TrainedSkills,
    traits: Traits
  ) {
    this.boosts = boosts;
    this.description = description;
    this.rules = rules;
    this.trainedLore = trainedLore;
    this.trainedSkills = trainedSkills;
    this.traits = traits;
  }
}

@Schema()
export class Background {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop(BackgroundSystem)
  system: BackgroundSystem;

  constructor(
    _id: string,
    name: string,
    system: BackgroundSystem,
    type: string
  ) {
    this._id = _id;
    this.name = name;
    this.system = system;
    this.type = type;
  }
}

export const BackgroundSchema = SchemaFactory.createForClass(Background);
