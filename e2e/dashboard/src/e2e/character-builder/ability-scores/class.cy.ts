import { features } from '../../../features';

beforeEach(() => {
  cy.navigateToFeature(features.characterBuilder.class);

  cy.getBySel('content-list-item').as('listContent');
  cy.getBySel('character-creation-next').as('nextButton');
});

describe('Class - multiple key abilities', () => {
  beforeEach(() => {
    cy.get('@listContent').contains('Fighter').click();

    cy.window().scrollTo('top');
    // cy.get('@nextButton').scrollIntoView();
    cy.get('@nextButton').click();
  });

  it('Should show a toggle button for each key ability', () => {
    cy.getBySel('restricted-boosts').should('be.visible');
    cy.getBySel('restricted-boost-dex').should('be.visible');
    cy.getBySel('restricted-boost-str').should('be.visible');
  });

  it('Should update ability scores when key ability boost is selected', () => {
    cy.getBySel('ability-score-dex').should('contain.text', '10').as('dex');

    cy.getBySel('restricted-boost-dex').click();
    cy.get('@dex').should('contain.text', '12');
  });

  it('Should update ability score boost buttons when key ability boost is selected', () => {
    cy.getBySel('restricted-boost-dex').click();
    cy.getBySel('ability-boost-dex').should('have.class', 'Mui-checked');
  });
});

describe('Class - single key ability', () => {
  beforeEach(() => {
    cy.get('@listContent').contains('Barbarian').click();

    cy.getBySel('character-creation-next').click();
  });

  it('Should show not show toggle buttons if class has only one key ability', () => {
    cy.getBySel('restricted-boosts').should('not.exist');
    cy.getBySel('restricted-boost-str').should('not.exist');
  });

  it('Should update ability scores with key ability boost', () => {
    cy.getBySel('ability-score-str').should('contain.text', '12');
  });

  it('Should update ability score boost buttons with key ability boost', () => {
    cy.getBySel('ability-boost-str')
      .filter('.Mui-checked')
      .should('have.class', 'Mui-checked');
  });
});
