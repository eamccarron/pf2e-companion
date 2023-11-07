import { Injectable } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';

import { Feat } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { MongoRepository } from 'typeorm';

@Injectable()
export class FeatsService extends CompendiumRepository<Feat> {
  constructor(
    @InjectRepository(Feat)
    private featsRepository: MongoRepository<Feat>
  ) {
    super(featsRepository);
  }

  public async findClassFeats(level: number, className: string) {
    return this.featsRepository.find({
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
