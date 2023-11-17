import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Feat, FeatSchema } from '@pf2-companion/compendium-models';

import { FeatsService } from './feats.service';
import { FeatsController } from './feats.controller';

import { ClassesModule } from '../character-classes/classes.module';
import { AncestriesModule } from '../ancestries/ancestries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feat.name,
        schema: FeatSchema,
      },
    ]),
    ClassesModule,
    AncestriesModule,
  ],
  providers: [FeatsService],
  controllers: [FeatsController],
})
export class TemplatesModule {}
