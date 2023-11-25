import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AncestriesService } from './ancestries.service';
import { AncestriesController } from './ancestries.controller';

import { Ancestry, AncestrySchema } from '@pf2-companion/compendium-models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ancestry.name,
        schema: AncestrySchema,
      },
    ]),
  ],
  providers: [AncestriesService],
  exports: [AncestriesService],
  controllers: [AncestriesController],
})
export class AncestriesModule {}
