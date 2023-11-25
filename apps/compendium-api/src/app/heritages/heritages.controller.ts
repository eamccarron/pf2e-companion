import { Controller, Get, Param } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

import { HeritagesService } from './heritages.service';

import type { Heritage } from '@pf2-companion/compendium-models';
import { AncestriesService } from '../ancestries/ancestries.service';

@Controller('heritages')
export class HeritagesController {
  constructor(
    private heritagesService: HeritagesService,
    private ancestriesService: AncestriesService
  ) {}

  @Get(':id')
  async getHeritages(@Param('id') ancestryId: string): Promise<Heritage[]> {
    if (!ancestryId) {
      throw new HttpException(
        'Missing required URL parameter (ancestryId)',
        400
      );
    }

    const { name: ancestrySlug } = await this.ancestriesService.findById(
      ancestryId
    );

    if (!ancestrySlug) {
      return [];
    }

    const heritages = await this.heritagesService.findHeritagesByAncestrySlug(
      ancestrySlug
    );

    if (!heritages || heritages.length === 0) {
      return [];
    }

    return heritages;
  }
}
