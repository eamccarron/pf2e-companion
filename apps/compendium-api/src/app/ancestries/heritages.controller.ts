import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AncestriesService } from './ancestries.service';

import type { Heritage } from '@pf2-companion/compendium-models';

@Controller('heritages')
export class HeritagesController {
  constructor(private ancestriesService: AncestriesService) {}

  @Get(':id')
  async getHeritages(@Param('id') id: string): Promise<Heritage[]> {
    const heritages = await this.ancestriesService.findHeritagesByAncestryId(
      id
    );

    if (!heritages || heritages.length === 0) {
      throw new HttpException(
        'Unable to find heritages for ancestry with id ' + id,
        HttpStatus.BAD_REQUEST
      );
    }

    return heritages;
  }
}
