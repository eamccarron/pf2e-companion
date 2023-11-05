import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';

import { Class } from '@pf2-companion/compendium-models';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassesService],
  controllers: [ClassesController],
})
export class ClassesModule {}
