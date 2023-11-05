import { Injectable } from '@nestjs/common';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';

import { Ancestry, Heritage } from '@pf2-companion/compendium-models';
import { CompendiumRepository } from '@pf2-companion/compendium-models';

import type { MongoRepository } from 'typeorm';

@Injectable()
export class AncestriesService extends CompendiumRepository<Ancestry> {
  constructor(
    @InjectRepository(Ancestry)
    private ancestriesRepository: MongoRepository<Ancestry>,
    @InjectRepository(Heritage)
    private heritagesRepository: MongoRepository<Heritage>
  ) {
    super(ancestriesRepository);
  }

  public async findHeritagesByAncestryId(id: string) {
    const { name: ancestryName } = await this.findById(id);

    return this.heritagesRepository.find({
      where: { 'system.ancestry.slug': ancestryName.toLowerCase() },
    });
  }
}
