import { Controller, Get } from '@nestjs/common';

import classDescriptions from './class-descriptions.json';
import { ClassesService } from './classes.service';

import type { ClassDescription } from '@pf2-companion/types/character-builder';
import type { Jsonify } from '../../../types/Jsonify';
import type { Class } from '@pf2-companion/compendium-models';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Get('class-descriptions')
  getDescriptions(): Jsonify<ClassDescription>[] {
    return classDescriptions;
  }

  @Get('classes')
  async getClasses(): Promise<Class[]> {
    const classes = await this.classesService.findAll();
    return classes;
  }
}
