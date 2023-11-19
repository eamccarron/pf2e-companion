import { features } from '../../../features';

beforeEach(() => {
  cy.navigateToFeature(features.characterBuilder.feats);
  cy.getBySel('content-list-item').as('listContent');

  cy.get('@listContent').contains('Ancestry').click();
  cy.getBySel('feat-list').as('featList');
});

describe('Ancestry feats', () => {
  it('Should display ancestry feat options in a list', () => {
    cy.get('@featList').should('have.length.gt', 1);
    cy.get('@featList').each((listItem) => expect(listItem).to.be.visible);
  });
});
