import { Controller, Get } from '@nestjs/common';

import { ClassesService } from './classes.service';

import type { Class } from '@pf2-companion/compendium-models';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Get()
  async getClasses(): Promise<Class[]> {
    const classes = await this.classesService.findAll();
    return classes;
  }
}
