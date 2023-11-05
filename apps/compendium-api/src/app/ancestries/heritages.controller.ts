import { Controller, Get, Param } from '@nestjs/common';
import { AncestriesService } from './ancestries.service';

import type { Heritage } from '@pf2-companion/compendium-models';

@Controller('heritages')
export class HeritagesController {
  constructor(private ancestriesService: AncestriesService) {}

  @Get(':id')
  async getHeritages(@Param('id') id: string): Promise<Heritage[]> {
    const heritages = await this.ancestriesService.findHeritagesByAncestryId(id);
    console.log(heritages);
    return heritages;
  }
}
