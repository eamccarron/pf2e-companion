import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Feat } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { Model } from 'mongoose';

@Injectable()
export class FeatsService extends CompendiumRepository<Feat> {
  constructor(
    @InjectModel(Feat.name)
    private featsModel: Model<Feat>
  ) {
    super(featsModel);
  }

  public async findClassFeats(level: number, className: string) {
    return this.featsModel.find({
      where: {
        $and: [
          { 'system.traits.value': { $eq: className } },
          {
            'system.level.value': { $lte: level },
          },
        ],
      },
    });
  }
}
