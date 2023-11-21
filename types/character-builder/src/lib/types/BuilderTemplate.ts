import type { FeatContent } from './FeatContent';
import type { Selection } from '@pf2-companion/types/ui-selection';

export interface BuilderTemplate {
  classFeats: Array<Selection<FeatContent>>;
  ancestryFeats: Array<Selection<FeatContent>>;
  // skillFeats: Array<Selection<FeatContent>>;
}
