import { Controller, Get } from '@nestjs/common';
import { BackgroundsService } from './backgrounds.service';

import type { Background } from '@pf2-companion/data-access-compendium';

@Controller('backgrounds')
export class BackgroundsController {
  constructor(private backgroundsService: BackgroundsService) {}

  @Get()
  async get(): Promise<Background[]> {
    return this.backgroundsService.findAll();
  }
}
