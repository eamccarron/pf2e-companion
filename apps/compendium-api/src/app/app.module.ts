import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AncestriesModule } from './ancestries/ancestries.module';
import { BackgroundsModule } from './backgrounds/backgrounds.module';

// Data model
import { Ancestry, Background } from '@pf2-companion/data-access-compendium';
import { CompendiumDB } from '@pf2-companion/db';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        entities: [Ancestry, Background],
      }),
      dataSourceFactory: async () => {
        return CompendiumDB.initialize();
      },
    }),
    AncestriesModule,
    BackgroundsModule,
  ],
  providers: [],
})
export class AppModule {}
