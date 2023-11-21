import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

import {
  Description,
  TrainedSkills,
  Rarity,
  AbilityScoreModifiers,
  Traits,
  Levels,
  AttackProficiencies,
  ArmorProficiencies,
  KeyAbility,
  Publication,
  SavingThrowProficiencies,
} from './System';

export class ClassSystem {
  @Prop(Levels)
  ancestryFeatLevels: Levels;

  @Prop({ type: AttackProficiencies })
  attacks: AttackProficiencies;

  @Prop(Levels)
  classFeatLevels: Levels;

  @Prop(ArmorProficiencies)
  defenses: ArmorProficiencies;

  @Prop(Description)
  description: Description;

  @Prop(Levels)
  generalFeatLevels: Levels;

  @Prop(KeyAbility)
  keyAbility: KeyAbility;

  @Prop(Publication)
  publication: Publication;

  @Prop(SavingThrowProficiencies)
  savingThrows: SavingThrowProficiencies;

  @Prop(Levels)
  skillFeatLevels: Levels;

  @Prop(Levels)
  skillIncreaseLevels: Levels;

  @Prop(TrainedSkills)
  trainedSkills: TrainedSkills;

  @Prop(Traits)
  traits: Traits;

  @Prop()
  rules: Array<any>;

  @Prop()
  perception: number;

  @Prop()
  hp: number;

  @Prop()
  classDC: number;

  constructor(
    ancestryFeatLevels: Levels,
    attacks: AttackProficiencies,
    classFeatLevels: Levels,
    defenses: ArmorProficiencies,
    description: Description,
    generalFeatLevels: Levels,
    keyAbility: KeyAbility,
    publication: Publication,
    savingThrows: SavingThrowProficiencies,
    skillFeatLevels: Levels,
    skillIncreaseLevels: Levels,
    trainedSkills: TrainedSkills,
    traits: Traits,
    rules: Array<any>,
    perception: number,
    hp: number,
    classDC: number
  ) {
    this.ancestryFeatLevels = ancestryFeatLevels;
    this.attacks = attacks;
    this.classFeatLevels = classFeatLevels;
    this.defenses = defenses;
    this.description = description;
    this.generalFeatLevels = generalFeatLevels;
    this.keyAbility = keyAbility;
    this.publication = publication;
    this.savingThrows = savingThrows;
    this.skillFeatLevels = skillFeatLevels;
    this.skillIncreaseLevels = skillIncreaseLevels;
    this.trainedSkills = trainedSkills;
    this.traits = traits;
    this.rules = rules;
    this.perception = perception;
    this.hp = hp;
    this.classDC = classDC;
  }
}

@Schema()
export class Class {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop(ClassSystem)
  system: ClassSystem;

  constructor(_id: string, name: string, system: ClassSystem, type: string) {
    this._id = _id;
    this.name = name;
    this.system = system;
    this.type = type;
  }
}

export const ClassSchema = SchemaFactory.createForClass(Class);
