import { Column, ObjectIdColumn, Entity, ManyToOne } from 'typeorm';

import {
  Description,
  TrainedSkills,
  Rarity,
  AbilityScoreModifiers,
  Traits,
} from './System';

import type { Ancestry } from './Ancestry';

export class RelatedAncestry {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  uuid: string;

  constructor(name: string, slug: string, uuid: string) {
    this.name = name;
    this.slug = slug;
    this.uuid = uuid;
  }
}

export class HeritageSystem {
  @Column((type) => RelatedAncestry)
  ancestry: RelatedAncestry;

  @Column((type) => Description)
  description: Description;

  @Column((type) => AbilityScoreModifiers)
  rules: [];

  @Column((type) => Traits)
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

@Entity('heritages')
export class Heritage {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column((type) => HeritageSystem)
  system: HeritageSystem;

  @ManyToOne("Ancestry", (ancestry: Ancestry) => ancestry.heritages)
  ancestry: Ancestry;

  constructor(
    id: string,
    name: string,
    slug: string,
    system: HeritageSystem,
    ancestry: Ancestry
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.system = system;
    this.ancestry = ancestry;
  }
}
