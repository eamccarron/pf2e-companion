import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Feat } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { Model, Query } from 'mongoose';

@Injectable()
export class FeatsService extends CompendiumRepository<Feat> {
  constructor(
    @InjectModel(Feat.name)
    private featsModel: Model<Feat>
  ) {
    super(featsModel);
  }

  public async findClassFeats(level: number, className: string) {
    const classFeats = await this.findByTraitName(className).where({
      'system.category': { $eq: 'class' },
      'system.level.value': { $lte: level },
    });

    return classFeats;
  }

  public async findAncestryFeats(level: number, ancestryName: string) {
    const ancestryFeatsAvailable = await this.findByTraitName(
      ancestryName
    ).where({
      'system.category': { $eq: 'ancestry' },
      'system.level.value': { $lte: level },
    });

    return ancestryFeatsAvailable;
  }
}
