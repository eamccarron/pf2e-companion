import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Class } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { Model, Document } from 'mongoose';

@Injectable()
export class ClassesService extends CompendiumRepository<Class> {
  constructor(
    @InjectModel(Class.name)
    private classesModel: Model<Class>
  ) {
    super(classesModel);
  }

  public async findClassFeatsAvailable(
    level: number,
    className: string
  ): Promise<any> {
    const {
      system: {
        classFeatLevels: { value: classFeatsAvailable },
      },
    } = (await this.classesModel
      .findOne({ name: className })
      .collation({ locale: 'en', strength: 2 })) as Class;

    return classFeatsAvailable[level];
  }
}
