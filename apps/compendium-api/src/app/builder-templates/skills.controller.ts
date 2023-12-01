import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ClassesService } from '../character-classes/classes.service';

@Controller('builder/skills')
export class FeatsController {
  constructor(private classesService: ClassesService) {}

  @Get()
  async getSkillIncreases(
    @Query('level') level: number,
    @Query('className') className: string
  ): Promise<number> {
    if (!level || !className) {
      throw new HttpException(
        'Missing required query parameters (level, className)',
        HttpStatus.BAD_REQUEST
      );
    }

    const skillIncreases = await this.classesService.findSkillIncreaseAvailable(
      Number(level),
      className
    );

    if (!skillIncreases) return 0;
    return skillIncreases;
  }
}
