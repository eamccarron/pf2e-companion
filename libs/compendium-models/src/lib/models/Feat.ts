import { Column, ObjectIdColumn, Entity } from 'typeorm';

import {
  Description,
  Duration,
  Publication,
  Prerequisites,
  Traits,
  Frequency,
  Level,
} from './System';

import type { Actions, ActionType } from './System';

export class FeatSystem {
  @Column()
  actionType: ActionType;

  @Column()
  actions: Actions;

  @Column()
  category: 'class' | 'ancestry' | 'general' | 'skill' | 'bonus';

  @Column(() => Duration)
  duration: Duration;

  @Column(() => Description)
  description: Description;

  @Column(() => Frequency)
  frequency: Frequency;

  @Column(() => Level)
  level: Level;

  @Column(() => Prerequisites)
  prerequisites: Prerequisites;

  @Column(() => Publication)
  publication: Publication;

  @Column(() => Traits)
  traits: Traits;

  constructor(
    actionType: ActionType,
    actions: Actions,
    category: 'class' | 'ancestry' | 'general' | 'skill' | 'bonus',
    duration: Duration,
    description: Description,
    frequency: Frequency,
    level: Level,
    prerequisites: Prerequisites,
    publication: Publication,
    traits: Traits
  ) {
    this.actionType = actionType;
    this.actions = actions;
    this.category = category;
    this.duration = duration;
    this.description = description;
    this.frequency = frequency;
    this.level = level;
    this.prerequisites = prerequisites;
    this.publication = publication;
    this.traits = traits;
  }
}

@Entity('feats')
export class Feat {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  system: FeatSystem;

  @Column()
  type: string;

  constructor(id: string, name: string, system: FeatSystem, type: string) {
    this.id = id;
    this.name = name;
    this.system = system;
    this.type = type;
  }
}
