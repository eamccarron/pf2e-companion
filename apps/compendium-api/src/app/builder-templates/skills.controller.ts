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
  ): Promise<boolean> {
    if (!level || !className) {
      throw new HttpException(
        'Missing required query parameters (level, className)',
        HttpStatus.BAD_REQUEST
      );
    }

    const skillIncrease = await this.classesService.findSkillIncreaseAvailable(
      Number(level),
      className
    );

    return skillIncrease;
  }
}
