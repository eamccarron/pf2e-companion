import { Column, ObjectIdColumn, Entity } from 'typeorm';

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
  @Column((type) => Levels)
  ancestryFeatLevels: Levels;

  @Column((type) => AttackProficiencies)
  attacks: AttackProficiencies;

  @Column((type) => Levels)
  classFeatLevels: Levels;

  @Column((type) => ArmorProficiencies)
  defenses: ArmorProficiencies;

  @Column((type) => Description)
  description: Description;

  @Column((type) => Levels)
  generalFeatLevels: Levels;

  @Column((type) => KeyAbility)
  keyAbility: KeyAbility;

  @Column((type) => Publication)
  publication: Publication;

  @Column((type) => SavingThrowProficiencies)
  savingThrows: SavingThrowProficiencies;

  @Column((type) => Levels)
  skillFeatLevels: Levels;

  @Column((type) => Levels)
  skillIncreaseLevels: Levels;

  @Column((type) => TrainedSkills)
  trainedSkills: TrainedSkills;

  @Column((type) => Traits)
  traits: Traits;

  @Column()
  rules: Array<any>;

  @Column()
  perception: number;

  @Column()
  hp: number;

  @Column()
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

@Entity('classes')
export class Class {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column((type) => ClassSystem)
  system: ClassSystem;

  constructor(id: string, name: string, system: ClassSystem, type: string) {
    this.id = id;
    this.name = name;
    this.system = system;
    this.type = type;
  }
}
