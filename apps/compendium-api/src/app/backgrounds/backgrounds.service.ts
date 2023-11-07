import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import {
  Background,
  CompendiumRepository,
} from '@pf2-companion/compendium-models';

@Injectable()
export class BackgroundsService extends CompendiumRepository<Background> {
  constructor(
    @InjectModel(Background.name)
    private backgroundsModel: Model<Background>
  ) {
    super(backgroundsModel);
  }
}
