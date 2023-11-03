import { Injectable } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';

import { Ancestry } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { MongoRepository } from 'typeorm';

@Injectable()
export class AncestriesService extends CompendiumRepository<Ancestry> {
  constructor(
    @InjectRepository(Ancestry)
    private ancestriesRepository: MongoRepository<Ancestry>
  ) {
    super(ancestriesRepository);
  }
}
