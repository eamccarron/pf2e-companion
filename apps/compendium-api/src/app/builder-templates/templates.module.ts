import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feat, Class } from '@pf2-companion/compendium-models';
import { FeatsService } from './feats.service';
import { FeatsController } from './feats.controller';
import { ClassesService } from '../character-classes/classes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feat]),
    TypeOrmModule.forFeature([Class]),
  ],
  providers: [FeatsService, ClassesService],
  controllers: [FeatsController],
})
export class TemplatesModule {}
