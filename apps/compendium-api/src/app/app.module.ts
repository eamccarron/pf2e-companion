import 'reflect-metadata';

import { Module } from '@nestjs/common';

import { AncestriesModule } from './ancestries/ancestries.module';
import { BackgroundsModule } from './backgrounds/backgrounds.module';
import { TemplatesModule } from './builder-templates/templates.module';

import { ClassesModule } from './character-classes/classes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env['DB_URI'] || 'mongodb://localhost:27017/compendium'),
    AncestriesModule,
    BackgroundsModule,
    ClassesModule,
    TemplatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
