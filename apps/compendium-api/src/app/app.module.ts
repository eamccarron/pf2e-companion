import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AncestriesModule } from './ancestries/ancestries.module';
import { BackgroundsModule } from './backgrounds/backgrounds.module';

// Data model
import { Ancestry, Background } from '@pf2-companion/data-access-compendium';
import { CompendiumDB } from '@pf2-companion/db';
import { ClassesController } from './character-classes/classes.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env['DB_HOST'],
      port: Number(process.env['DB_PORT']),
      database: 'compendium',
      entities: [Ancestry, Background],
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
  ],
  controllers: [ClassesController],
  providers: [],
})
export class AppModule {}
