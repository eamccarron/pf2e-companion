import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AncestriesModule } from './ancestries/ancestries.module';
import { BackgroundsModule } from './backgrounds/backgrounds.module';

// Data model
import {
  Ancestry,
  Background,
  Class,
  Heritage,
} from '@pf2-companion/compendium-models';
import { ClassesModule } from './character-classes/classes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env['DB_HOST'],
      port: Number(process.env['DB_PORT']),
      database: 'compendium',
      entities: [Ancestry, Background, Class, Heritage],
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     entities: [Ancestry, Background],
    //   }),
    //   dataSourceFactory: async () => {
    //     const dataSource = await CompendiumDB.initialize();
    //     return dataSource;
    //   },
    // }),
    AncestriesModule,
    BackgroundsModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
