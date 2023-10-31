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
  value: SkillIdentifier[];

  constructor(value: SkillIdentifier[]) {
    this.value = value;
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
