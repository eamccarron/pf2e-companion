import { Controller, Get, Query } from '@nestjs/common';
import { BackgroundsService } from './feats.service';

@Controller('builder/feats')
export class BackgroundsController {
  constructor(private featsService: BackgroundsService) {}

  @Get('class')
  async get(
    @Query('level') level: number,
    @Query('id') id: string
  ): Promise<Feat[]> {
    const feats = await this.featsService.findAll();
    return feats;
  }
}
