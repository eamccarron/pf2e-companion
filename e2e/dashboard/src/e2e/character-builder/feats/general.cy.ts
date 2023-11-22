import { features } from '../../../features';

beforeEach(() => {
  cy.navigateToFeature(features.characterBuilder.feats);
  cy.getBySel('content-list-item').as('listContent');
});

describe('Feat selection', () => {
  it('Should display feat options in a list', () => {
    cy.get('@listContent').should('have.length.gt', 1);
    cy.get('@listContent').each((listItem) => expect(listItem).to.be.visible);
  });
});
