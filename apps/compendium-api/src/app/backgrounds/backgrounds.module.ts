import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackgroundsService } from './backgrounds.service';
import { BackgroundsController } from './backgrounds.controller';

import { Background, BackgroundSchema } from '@pf2-companion/compendium-models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Background.name,
        schema: BackgroundSchema,
      },
    ]),
  ],
  providers: [BackgroundsService],
  controllers: [BackgroundsController],
})
export class BackgroundsModule {}
