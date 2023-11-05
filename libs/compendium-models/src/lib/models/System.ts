import { Column } from 'typeorm';

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

export class KeyAbility {
  @Column()
  value: Array<AbilityIdentifier>;

  constructor(value: Array<AbilityIdentifier>) {
    this.value = value;
  }
}

export class SavingThrowProficiencies {
  @Column()
  fortitude: number;
  @Column()
  reflex: number;
  @Column()
  will: number;

  constructor(fortitude: number, reflex: number, will: number) {
    this.fortitude = fortitude;
    this.reflex = reflex;
    this.will = will;
  }
}

export class ArmorProficiencies {
  @Column()
  heavy: number;
  @Column()
  light: number;
  @Column()
  medium: number;
  @Column()
  unarmored: number;

  constructor(heavy: number, light: number, medium: number, unarmored: number) {
    this.heavy = heavy;
    this.light = light;
    this.medium = medium;
    this.unarmored = unarmored;
  }
}

export class AttackProficiencies {
  @Column()
  advanced: number;

  @Column()
  martial: number;

  @Column()
  other: { name: string; rank: number };

  @Column()
  simple: number;

  @Column()
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
  @Column()
  value: Array<number>;

  constructor(value: Array<number>) {
    this.value = value;
  }
}

export class Description {
  @Column()
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class AbilityScoreModifier {
  @Column()
  value: AbilityIdentifier[];

  constructor(value: AbilityIdentifier[]) {
    this.value = value;
  }
}

export class AbilityScoreModifiers {
  @Column((type) => AbilityScoreModifier)
  '0': AbilityScoreModifier;

  @Column((type) => AbilityScoreModifier)
  '1': AbilityScoreModifier;

  @Column((type) => AbilityScoreModifier)
  '2': AbilityScoreModifier;
}

export class AdditionalLanguages {
  @Column()
  count: number;

  @Column()
  custom: string;

  @Column()
  value: string[];

  constructor(count: number, custom: string, value: string[]) {
    this.count = count;
    this.custom = custom;
    this.value = value;
  }
}

export class TrainedSkills {
  @Column()
  additional: number;

  @Column()
  value: SkillIdentifier[];

  constructor(additional: number, value: SkillIdentifier[]) {
    this.value = value;
    this.additional = additional;
  }
}

export class Languages {
  @Column()
  custom: string;

  @Column()
  value: string[];

  constructor(custom: string, value: string[]) {
    this.custom = custom;
    this.value = value;
  }
}

export class Item {
  @Column()
  img: string;

  @Column()
  level: number;

  @Column()
  name: string;

  @Column()
  uuid: string;

  constructor(img: string, level: number, name: string, uuid: string) {
    this.img = img;
    this.level = level;
    this.name = name;
    this.uuid = uuid;
  }
}

export class Publication {
  @Column()
  license: string;

  @Column()
  remaster: boolean;

  @Column()
  title: string;

  constructor(license: string, remaster: boolean, title: string) {
    this.license = license;
    this.remaster = remaster;
    this.title = title;
  }
}

export class Traits {
  @Column()
  rarity: Rarity;

  @Column()
  value: string[];

  constructor(rarity: Rarity, value: string[]) {
    this.rarity = rarity;
    this.value = value;
  }
}
