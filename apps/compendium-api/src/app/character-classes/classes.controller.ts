import { Controller, Get } from '@nestjs/common';

import { classDescriptions } from '@pf2-companion/character-builder/server';

import type { ClassDescription } from '@pf2-companion/character-builder/types';
import type { Jsonify } from '../../../types/Jsonify';

@Controller('classes')
export class ClassesController {
  @Get('class-descriptions')
  get(): Jsonify<ClassDescription>[] {
    return classDescriptions;
  }
}