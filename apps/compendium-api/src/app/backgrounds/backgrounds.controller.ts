import { Controller, Get } from '@nestjs/common';
import { BackgroundsService } from './backgrounds.service';

import type { Background } from '@pf2-companion/compendium-models';

@Controller('backgrounds')
export class BackgroundsController {
  constructor(private backgroundsService: BackgroundsService) {}

  @Get()
  async get(): Promise<Background[]> {
    const backgrounds = await this.backgroundsService.findAll();
    console.log(backgrounds[0].system.traits);
    return backgrounds;
  }
}
