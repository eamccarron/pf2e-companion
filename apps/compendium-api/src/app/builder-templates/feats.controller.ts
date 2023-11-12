import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { FeatsService } from './feats.service';
import { ClassesService } from '../character-classes/classes.service';
import { IncludeDocumentIdInterceptor } from '../IncludeDocumentId.interceptor';

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
  ): Promise<{
    classFeats: Feat[];
  }> {
    if (!level || !className) {
      throw new HttpException(
        'Missing required query parameters (level, className)',
        HttpStatus.BAD_REQUEST
      );
    }

    const options = await this.featsService.findClassFeats(
      Number(level),
      className
    );

    const featsAvailable = await this.classesService.findClassFeatsAvailable(
      level,
      className
    );

    return {
      classFeats: options,
    };
  }

  private async getClassFeats(level: number, className: string) {
    return this.featsService.findClassFeats(level, className);
  }
}
