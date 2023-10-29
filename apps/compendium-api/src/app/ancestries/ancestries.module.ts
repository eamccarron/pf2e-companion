import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AncestriesService } from './ancestries.service';
import { AncestriesController } from './ancestries.controller';

import { Ancestry } from '@pf2-companion/data-access-compendium';

@Module({
  imports: [TypeOrmModule.forFeature([Ancestry])],
  providers: [AncestriesService],
  controllers: [AncestriesController],
})
export class AncestriesModule {}