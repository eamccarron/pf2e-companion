import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Class } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { Model } from 'mongoose';

@Injectable()
export class ClassesService extends CompendiumRepository<Class> {
  constructor(
    @InjectModel(Class.name)
    private classesModel: Model<Class>
  ) {
    super(classesModel);
  }

  public async findClassFeatsAvailable(level: number, className: string) {
    return this.classesModel.find({
      where: {},
    });
  }
}
