import { Injectable } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';

import { Class } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { MongoRepository } from 'typeorm';

@Injectable()
export class ClassesService extends CompendiumRepository<Class> {
  constructor(
    @InjectRepository(Class)
    private classesRepository: MongoRepository<Class>
  ) {
    super(classesRepository);
  }

  public async findClassFeatsAvailable(level: number, className: string) {
    return this.classesRepository.find({
      where: {},
    });
  }
}
