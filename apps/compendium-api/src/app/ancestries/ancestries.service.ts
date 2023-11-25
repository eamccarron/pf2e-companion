import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { Ancestry } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

@Injectable()
export class AncestriesService extends CompendiumRepository<Ancestry> {
  constructor(
    @InjectModel(Ancestry.name)
    private ancestriesModel: Model<Ancestry>
  ) {
    super(ancestriesModel);
  }
}
