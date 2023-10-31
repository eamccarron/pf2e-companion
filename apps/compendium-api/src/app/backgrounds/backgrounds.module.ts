import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackgroundsService } from './backgrounds.service';
import { BackgroundsController } from './backgrounds.controller';

import { Background } from '@pf2-companion/compendium-models';

@Module({
  imports: [TypeOrmModule.forFeature([Background])],
  providers: [BackgroundsService],
  controllers: [BackgroundsController],
})
export class BackgroundsModule {}
