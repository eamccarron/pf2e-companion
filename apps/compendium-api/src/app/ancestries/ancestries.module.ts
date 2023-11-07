import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AncestriesService } from './ancestries.service';
import { AncestriesController } from './ancestries.controller';
import { HeritagesController } from './heritages.controller';

import { Ancestry, AncestrySchema, Heritage, HeritageSchema } from '@pf2-companion/compendium-models';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Ancestry.name,
      schema: AncestrySchema
    }, {
      name: Heritage.name,
      schema: HeritageSchema
    }]),
  ],
  providers: [AncestriesService],
  controllers: [AncestriesController, HeritagesController],
})
export class AncestriesModule {}
