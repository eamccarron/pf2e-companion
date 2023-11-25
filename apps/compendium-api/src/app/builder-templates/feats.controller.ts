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
import { AncestriesService } from '../ancestries/ancestries.service';

import { IncludeDocumentIdInterceptor } from '../IncludeDocumentId.interceptor';

import type { Feat } from '@pf2-companion/compendium-models';

@Controller('builder/feats')
export class FeatsController {
  constructor(
    private featsService: FeatsService,
    private classesService: ClassesService,
    private ancestriesService: AncestriesService
  ) {}

  @Get('class')
  async getClassFeats(
    @Query('level') level: number,
    @Query('className') className: string
  ): Promise<Feat[]> {
    if (!level || !className) {
      throw new HttpException(
        'Missing required query parameters (level, className)',
        HttpStatus.BAD_REQUEST
      );
    }

    const classFeatAvailable = await this.classesService.findClassFeatAvailable(
      Number(level),
      className
    );

    console.log(level, className, classFeatAvailable);
    if (!classFeatAvailable) return [];
    return await this.featsService.findClassFeats(Number(level), className);
  }

  @Get('ancestry')
  async getAncestryFeats(
    @Query('level') level: number,
    @Query('className') className: string,
    @Query('ancestryId') ancestryId: string
  ): Promise<Feat[]> {
    if (!level || !className || !ancestryId) {
      throw new HttpException(
        'Missing required query parameters (level, className)',
        HttpStatus.BAD_REQUEST
      );
    }

    const ancestryFeatsAvailable =
      await this.classesService.findAncestryFeatAvailable(
        Number(level),
        className
      );
    if (!ancestryFeatsAvailable) return [];

    const ancestry = await this.ancestriesService.findById(ancestryId);
    const ancestryFeats = await this.featsService.findAncestryFeats(
      Number(level),
      ancestry.name
    );

    return ancestryFeats;
  }
}
