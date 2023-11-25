import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Heritage, HeritageSchema } from '@pf2-companion/compendium-models';

import { HeritagesService } from './heritages.service';
import { HeritagesController } from './heritages.controller';

import { AncestriesModule } from '../ancestries/ancestries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Heritage.name,
        schema: HeritageSchema,
      },
    ]),
    AncestriesModule,
  ],
  providers: [HeritagesService],
  controllers: [HeritagesController],
})
export class HeritagesModule {}
