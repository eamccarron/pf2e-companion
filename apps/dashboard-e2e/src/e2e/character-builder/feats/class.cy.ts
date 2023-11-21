import { features } from '../../../features';
import muiSelectors from '../../../support/muiSelectors';

import { featSelection } from './featSelection';

beforeEach(() => {
  cy.navigateToFeature(features.characterBuilder.feats);
  cy.getBySel('content-list-item').as('listContent');

  cy.get('@listContent').contains('Class').click();
  cy.getBySel('feat-list').as('featList');

  cy.get('@featList')
    .children()
    .filter(muiSelectors.listItem)
    .as('featListContent');
});

describe('Class feats', featSelection);