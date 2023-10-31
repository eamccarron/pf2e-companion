import { Injectable } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';

import { Background } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { MongoRepository } from 'typeorm';

@Injectable()
export class BackgroundsService extends CompendiumRepository<Background> {
  constructor(
    @InjectRepository(Background)
    private backgroundsRepository: MongoRepository<Background>
  ) {
    super(backgroundsRepository);
  }
}
