import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Feat, FeatSchema, Class, ClassSchema } from '@pf2-companion/compendium-models';
import { FeatsService } from './feats.service';
import { FeatsController } from './feats.controller';
import { ClassesService } from '../character-classes/classes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feat.name,
        schema: FeatSchema,
      },
      {
        name: Class.name,
        schema: ClassSchema,
      },
    ]),
  ],
  providers: [FeatsService, ClassesService],
  controllers: [FeatsController],
})
export class TemplatesModule {}
