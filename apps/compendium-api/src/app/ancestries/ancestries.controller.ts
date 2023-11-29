import { Controller, Get } from '@nestjs/common';
import { AncestriesService } from './ancestries.service';

import type { Ancestry } from '@pf2-companion/compendium-models';

@Controller('ancestries')
export class AncestriesController {
  constructor(private ancestriesService: AncestriesService) {}

  @Get()
  async get(): Promise<Ancestry[]> {
    const ancestries = await this.ancestriesService.findAll();
    return ancestries;
  }
}
