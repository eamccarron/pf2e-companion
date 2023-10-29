import { Controller, Get } from '@nestjs/common';

import classDescriptions from './class-descriptions.json';
import type { ClassDescription } from './class-description.type';

import type { Jsonify } from '../../../types/Jsonify';

@Controller('classes')
export class ClassesController {
  @Get('class-descriptions')
  get(): Jsonify<ClassDescription>[] {
    return classDescriptions;
  }
}
