import { CompendiumRepository } from './compendium';
import { BackgroundSchema } from '../models/background';

import type { Background } from '../../../types';

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
