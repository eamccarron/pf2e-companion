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

  public async findByClassName(className: string): Promise<Class> {
    return await this.classesModel
      .findOne({ name: className })
      .collation({ locale: 'en', strength: 2 });
  }

  public async findClassFeatAvailable(
    level: number,
    className: string
  ): Promise<boolean> {
    const classes = await this.findByClassName(className);
    if (!classes) return false;

    const {
      system: {
        classFeatLevels: { value: classFeatsAvailable },
      },
    } = classes;

    return classFeatsAvailable?.includes(level);
  }

  public async findAncestryFeatAvailable(
    level: number,
    className: string
  ): Promise<boolean> {
    const classes = await this.findByClassName(className);
    if (!classes) return false;

    const {
      system: {
        ancestryFeatLevels: { value: ancestryFeatsAvailable },
      },
    } = classes;

    return ancestryFeatsAvailable?.includes(level);
  }
}
