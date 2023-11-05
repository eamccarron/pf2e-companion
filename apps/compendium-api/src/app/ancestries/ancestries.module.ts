import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AncestriesService } from './ancestries.service';
import { AncestriesController } from './ancestries.controller';
import { HeritagesController } from './heritages.controller';

import { Ancestry, Heritage } from '@pf2-companion/compendium-models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ancestry]),
    TypeOrmModule.forFeature([Heritage]),
  ],
  providers: [AncestriesService],
  controllers: [AncestriesController, HeritagesController],
})
export class AncestriesModule {}
