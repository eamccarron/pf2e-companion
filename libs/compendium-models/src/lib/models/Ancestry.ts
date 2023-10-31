import { Column, Entity, ObjectIdColumn } from 'typeorm';

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
  @Column((type) => AdditionalLanguages)
  additionalLanguages: AdditionalLanguages;

  @Column((type) => AbilityScoreModifiers)
  boosts: AbilityScoreModifiers;

  @Column((type) => Description)
  description: Description;

  @Column((type) => AbilityScoreModifiers)
  flaws: AbilityScoreModifiers;

  @Column()
  hp: number;

  // Breaking due to issue with arrays in mongo: https://github.com/typeorm/typeorm/issues/10391
  // @Column((type) => Item)
  // items: Item[];

  @Column((type) => Languages)
  languages: Languages;

  @Column((type) => Publication)
  publication: Publication;

  @Column()
  reach: number;

  @Column()
  rules: object[];

  @Column()
  size: string;

  @Column()
  speed: number;

  @Column((type) => Traits)
  traits: Traits;

  @Column()
  vision: string;

  constructor(
    additionalLanguages: AdditionalLanguages,
    boosts: AbilityScoreModifiers,
    description: Description,
    flaws: AbilityScoreModifiers,
    hp: number,
    // items: Item[],
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
    // this.items = items;
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

@Entity('ancestries')
export class Ancestry {
  @ObjectIdColumn()
  _id: string;

  @Column()
  img: string;

  @Column()
  name: string;

  @Column((type) => AncestrySystem)
  system: AncestrySystem;

  @Column()
  type: string;

  constructor(
    _id: string,
    img: string,
    name: string,
    system: AncestrySystem,
    type: string
  ) {
    this._id = _id;
    this.img = img;
    this.name = name;
    this.system = system;
    this.type = type;
  }
}
