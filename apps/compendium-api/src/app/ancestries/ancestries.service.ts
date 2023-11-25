import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { Ancestry, Heritage } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

@Injectable()
export class AncestriesService extends CompendiumRepository<Ancestry> {
  constructor(
    @InjectModel(Ancestry.name)
    private ancestriesModel: Model<Ancestry>,
    @InjectModel(Heritage.name)
    private heritagesModel: Model<Heritage>
  ) {
    super(ancestriesModel);
  }

  public async findHeritagesByAncestryId(id: string) {
    const { name: ancestryName } = await this.findById(id);

    return this.heritagesModel.find({
      'system.ancestry.slug': ancestryName.toLowerCase(),
    });
  }
}
