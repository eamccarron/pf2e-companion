import { model, type Model } from 'mongoose';

import { BackgroundSchema, type Background } from '../schemas/background';
import { CompendiumRepository } from './compendium';

export class BackgroundRepository extends CompendiumRepository<Background> {
  private static instance: BackgroundRepository;

  private constructor() {
    super(BackgroundSchema, 'Backgrounds');
  }

  public static getInstance(): BackgroundRepository {
    if (!BackgroundRepository.instance) {
      BackgroundRepository.instance = new BackgroundRepository();
    }

    return BackgroundRepository.instance;
  }
}
