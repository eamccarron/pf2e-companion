import { Prop } from '@nestjs/mongoose';

export type ActionTypes = 'action' | 'reaction' | 'free' | 'passive';

export class ActionType {
  value: ActionTypes;

  constructor(value: ActionTypes) {
    this.value = value;
  }
}

export class Actions {
  value: 1 | 2 | 3;

  constructor(value: 1 | 2 | 3) {
    this.value = value;
  }
}

export type AbilityIdentifier = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type SkillIdentifier =
  | 'acr'
  | 'arc'
  | 'ath'
  | 'cra'
  | 'dec'
  | 'dip'
  | 'itm'
  | 'med'
  | 'nat'
  | 'occ'
  | 'prf'
  | 'rel'
  | 'soc'
  | 'ste'
  | 'sur'
  | 'thi';

export type Rarity = 'common' | 'uncommon' | 'rare';

export class Level {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

export class Prerequisites {
  @Prop()
  value: Array<{ value: string }>;

  constructor(value: Array<{ value: string }>) {
    this.value = value;
  }
}

export class Frequency {
  @Prop()
  max: number;

  @Prop()
  per: string;

  @Prop()
  value: number;

  constructor(max: number, per: string, value: number) {
    this.max = max;
    this.per = per;
    this.value = value;
  }
}

export class Duration {
  @Prop()
  expiry: string;

  @Prop()
  sustained: boolean;

  constructor(expiry: string, sustained: boolean) {
    this.expiry = expiry;
    this.sustained = sustained;
  }
}

export class KeyAbility {
  @Prop()
  value: Array<AbilityIdentifier>;

  constructor(value: Array<AbilityIdentifier>) {
    this.value = value;
  }
}

export class SavingThrowProficiencies {
  @Prop()
  fortitude: number;
  @Prop()
  reflex: number;
  @Prop()
  will: number;

  constructor(fortitude: number, reflex: number, will: number) {
    this.fortitude = fortitude;
    this.reflex = reflex;
    this.will = will;
  }
}

export class ArmorProficiencies {
  @Prop()
  heavy: number;
  @Prop()
  light: number;
  @Prop()
  medium: number;
  @Prop()
  unarmored: number;

  constructor(heavy: number, light: number, medium: number, unarmored: number) {
    this.heavy = heavy;
    this.light = light;
    this.medium = medium;
    this.unarmored = unarmored;
  }
}

class OtherAttackProficiency {
  name: string;
  rank: number;

  constructor(name: string, rank: number) {
    this.name = name;
    this.rank = rank;
  }
}

export class AttackProficiencies {
  @Prop()
  advanced: number;

  @Prop()
  martial: number;

  @Prop(OtherAttackProficiency)
  other: OtherAttackProficiency;

  @Prop()
  simple: number;

  @Prop()
  unarmed: number;

  constructor(
    advanced: number,
    martial: number,
    other: { name: string; rank: number },
    simple: number,
    unarmed: number
  ) {
    this.advanced = advanced;
    this.martial = martial;
    this.other = other;
    this.simple = simple;
    this.unarmed = unarmed;
  }
}

export class Levels {
  @Prop()
  value: Array<number>;

  constructor(value: Array<number>) {
    this.value = value;
  }
}

export class Description {
  @Prop()
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class AbilityScoreModifier {
  @Prop()
  value: AbilityIdentifier[];

  constructor(value: AbilityIdentifier[]) {
    this.value = value;
  }
}

export class AbilityScoreModifiers {
  @Prop(AbilityScoreModifier)
  '0': AbilityScoreModifier;

  @Prop(AbilityScoreModifier)
  '1': AbilityScoreModifier;

  @Prop(AbilityScoreModifier)
  '2': AbilityScoreModifier;
}

export class AdditionalLanguages {
  @Prop()
  count: number;

  @Prop()
  custom: string;

  @Prop()
  value: string[];

  constructor(count: number, custom: string, value: string[]) {
    this.count = count;
    this.custom = custom;
    this.value = value;
  }
}

export class TrainedSkills {
  @Prop()
  additional: number;

  @Prop()
  value: SkillIdentifier[];

  constructor(additional: number, value: SkillIdentifier[]) {
    this.value = value;
    this.additional = additional;
  }
}

export class Languages {
  @Prop()
  custom: string;

  @Prop()
  value: string[];

  constructor(custom: string, value: string[]) {
    this.custom = custom;
    this.value = value;
  }
}

export class Item {
  @Prop()
  img: string;

  @Prop()
  level: number;

  @Prop()
  name: string;

  @Prop()
  uuid: string;

  constructor(img: string, level: number, name: string, uuid: string) {
    this.img = img;
    this.level = level;
    this.name = name;
    this.uuid = uuid;
  }
}

export class Publication {
  @Prop()
  license: string;

  @Prop()
  remaster: boolean;

  @Prop()
  title: string;

  constructor(license: string, remaster: boolean, title: string) {
    this.license = license;
    this.remaster = remaster;
    this.title = title;
  }
}

export class Traits {
  @Prop()
  rarity: Rarity;

  @Prop()
  value: string[];

  constructor(rarity: Rarity, value: string[]) {
    this.rarity = rarity;
    this.value = value;
  }
}
