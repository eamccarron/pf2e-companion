import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { Heritage } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

@Injectable()
export class HeritagesService extends CompendiumRepository<Heritage> {
  constructor(
    @InjectModel(Heritage.name)
    private heritagesModel: Model<Heritage>
  ) {
    super(heritagesModel);
  }

  public async findHeritagesByAncestrySlug(slug: string) {
    return this.heritagesModel
      .find({
        $or: [{ 'system.ancestry.slug': slug }, { 'system.ancestry': null }],
      })
      .collation({ locale: 'en', strength: 2 });
  }
}
