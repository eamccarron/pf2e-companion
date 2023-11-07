import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type HeritageDocument = HydratedDocument<Heritage>;

import {
  Description,
  TrainedSkills,
  Rarity,
  AbilityScoreModifiers,
  Traits,
} from './System';

import type { Ancestry } from './Ancestry';

export class RelatedAncestry {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  uuid: string;

  constructor(name: string, slug: string, uuid: string) {
    this.name = name;
    this.slug = slug;
    this.uuid = uuid;
  }
}

export class HeritageSystem {
  @Prop(RelatedAncestry)
  ancestry: RelatedAncestry;

  @Prop(Description)
  description: Description;

  @Prop(AbilityScoreModifiers)
  rules: [];

  @Prop(Traits)
  traits: Traits;

  constructor(
    ancestry: RelatedAncestry,
    description: Description,
    rules: [],
    traits: Traits
  ) {
    this.ancestry = ancestry;
    this.description = description;
    this.rules = rules;
    this.traits = traits;
  }
}

@Schema()
export class Heritage {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop(HeritageSystem)
  system: HeritageSystem;

  constructor(name: string, slug: string, system: HeritageSystem) {
    this.name = name;
    this.slug = slug;
    this.system = system;
  }
}

export const HeritageSchema = SchemaFactory.createForClass(Heritage);
