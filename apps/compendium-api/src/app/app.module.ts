import 'reflect-metadata';

import { Module } from '@nestjs/common';

import { AncestriesModule } from './ancestries/ancestries.module';
import { BackgroundsModule } from './backgrounds/backgrounds.module';
import { TemplatesModule } from './builder-templates/templates.module';

import { ClassesModule } from './character-classes/classes.module';
import { MongooseModule } from '@nestjs/mongoose';

import { HealthCheckController } from './healthCheck.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env['DB_HOST']}:${process.env['DB_PORT']}/compendium`
    ),
    AncestriesModule,
    BackgroundsModule,
    ClassesModule,
    TemplatesModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
