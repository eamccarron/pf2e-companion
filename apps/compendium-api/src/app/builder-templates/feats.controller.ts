import { Controller, Get, Query } from '@nestjs/common';
import { FeatsService } from './feats.service';
import { ClassesService } from '../character-classes/classes.service';

import type { Feat } from '@pf2-companion/compendium-models';

@Controller('builder/feats')
export class FeatsController {
  constructor(
    private featsService: FeatsService,
    private classesService: ClassesService
  ) {}

  @Get('class')
  async get(
    @Query('level') level: number,
    @Query('className') className: string
  ): Promise<Feat[]> {
    return this.featsService.findClassFeats(Number(level), className);
  }
}
