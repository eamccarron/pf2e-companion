import { Column, ObjectIdColumn, Entity } from 'typeorm';

import {
  Description,
  TrainedSkills,
  Rarity,
  AbilityScoreModifiers,
  Traits,
} from './System';

export class BackgroundSystem {
  @Column((type) => AbilityScoreModifiers)
  boosts: AbilityScoreModifiers;

  @Column((type) => Description)
  description: Description;

  @Column((type) => AbilityScoreModifiers)
  rules: [];

  @Column()
  trainedLore: string;

  @Column((type) => TrainedSkills)
  trainedSkills: TrainedSkills;

  @Column((type) => Traits)
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

@Entity()
export class Background {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  get type(): string {
    return 'background';
  }

  @Column((type) => BackgroundSystem)
  system: BackgroundSystem;

  constructor(id: string, name: string, system: BackgroundSystem) {
    this.id = id;
    this.name = name;
    this.system = system;
  }
}
