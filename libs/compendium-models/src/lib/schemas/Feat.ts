import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type FeatDocument = HydratedDocument<Feat>;

import {
  Description,
  Duration,
  Publication,
  Prerequisites,
  Traits,
  Frequency,
  Level,
  ActionType,
} from './System';

import type { Actions } from './System';

export class FeatSystem {
  @Prop(ActionType)
  actionType: ActionType;

  @Prop()
  actions: Actions;

  @Prop()
  category: 'class' | 'ancestry' | 'general' | 'skill' | 'bonus';

  @Prop(() => Duration)
  duration: Duration;

  @Prop(() => Description)
  description: Description;

  @Prop(() => Frequency)
  frequency: Frequency;

  @Prop(() => Level)
  level: Level;

  @Prop(() => Prerequisites)
  prerequisites: Prerequisites;

  @Prop(() => Publication)
  publication: Publication;

  @Prop(() => Traits)
  traits: Traits;

  constructor(
    actionType: ActionType,
    actions: Actions,
    category: 'class' | 'ancestry' | 'general' | 'skill' | 'bonus',
    duration: Duration,
    description: Description,
    frequency: Frequency,
    level: Level,
    prerequisites: Prerequisites,
    publication: Publication,
    traits: Traits
  ) {
    this.actionType = actionType;
    this.actions = actions;
    this.category = category;
    this.duration = duration;
    this.description = description;
    this.frequency = frequency;
    this.level = level;
    this.prerequisites = prerequisites;
    this.publication = publication;
    this.traits = traits;
  }
}

@Schema()
export class Feat {
  @Prop()
  name: string;

  @Prop()
  system: FeatSystem;

  @Prop()
  type: string;

  constructor(name: string, system: FeatSystem, type: string) {
    this.name = name;
    this.system = system;
    this.type = type;
  }
}

export const FeatSchema = SchemaFactory.createForClass(Feat);
