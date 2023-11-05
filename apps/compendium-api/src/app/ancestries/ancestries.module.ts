import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AncestriesService } from './ancestries.service';
import { AncestriesController } from './ancestries.controller';

import { Ancestry, Heritage } from '@pf2-companion/compendium-models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ancestry]),
    TypeOrmModule.forFeature([Heritage]),
  ],
  providers: [AncestriesService],
  controllers: [AncestriesController],
})
export class AncestriesModule {}
