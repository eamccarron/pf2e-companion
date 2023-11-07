import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type AncestryDocument = HydratedDocument<Ancestry>;

import {
  AbilityScoreModifiers,
  AdditionalLanguages,
  Languages,
  Item,
  Description,
  Publication,
  Traits,
} from './System';

export class AncestrySystem {
  @Prop(AdditionalLanguages)
  additionalLanguages: AdditionalLanguages;

  @Prop(AbilityScoreModifiers)
  boosts: AbilityScoreModifiers;

  @Prop(Description)
  description: Description;

  @Prop(AbilityScoreModifiers)
  flaws: AbilityScoreModifiers;

  @Prop()
  hp: number;

  @Prop([Item])
  items: Item[];

  @Prop(Languages)
  languages: Languages;

  @Prop(Publication)
  publication: Publication;

  @Prop()
  reach: number;

  @Prop()
  rules: object[];

  @Prop()
  size: string;

  @Prop()
  speed: number;

  @Prop(Traits)
  traits: Traits;

  @Prop()
  vision: string;

  constructor(
    additionalLanguages: AdditionalLanguages,
    boosts: AbilityScoreModifiers,
    description: Description,
    flaws: AbilityScoreModifiers,
    hp: number,
    items: Item[],
    languages: Languages,
    publication: Publication,
    reach: number,
    rules: object[],
    size: string,
    speed: number,
    traits: Traits,
    vision: string
  ) {
    this.additionalLanguages = additionalLanguages;
    this.boosts = boosts;
    this.description = description;
    this.flaws = flaws;
    this.hp = hp;
    this.items = items;
    this.languages = languages;
    this.publication = publication;
    this.reach = reach;
    this.rules = rules;
    this.size = size;
    this.speed = speed;
    this.traits = traits;
    this.vision = vision;
  }
}

@Schema()
export class Ancestry {
  @Prop()
  img: string;

  @Prop()
  name: string;

  @Prop(AncestrySystem)
  system: AncestrySystem;

  @Prop()
  type: string;

  constructor(
    _id: string,
    img: string,
    name: string,
    system: AncestrySystem,
    type: string
  ) {
    this.img = img;
    this.name = name;
    this.system = system;
    this.type = type;
  }
}

export const AncestrySchema = SchemaFactory.createForClass(Ancestry);