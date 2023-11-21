import { features } from '../../../features';

beforeEach(() => {
  cy.navigateToFeature(features.characterBuilder.abilityScores, {
    characterBuilder: { className: 'Wizard' },
  });

  cy.getBySel('content-list-item').as('listContent');
  cy.getBySel('ancestry-list').as('ancestryList');

  cy.getBySel('background-tab').as('backgroundTab');
  cy.get('@backgroundTab').click();
  cy.getBySel('background-list').as('backgroundList');
});

describe('Backgrounds', () => {
  it('should show list of backgrounds when background tab is clicked', () => {
    cy.get('@ancestryList').should('not.exist');
    cy.get('@backgroundList').should('be.visible');
    cy.get('@listContent').should('have.length', 389);
    cy.getBySel('content-list-item').each((listItem) => {
      expect(listItem.text()).to.not.be.empty;
    });
  });

  it('should filter based on common backgrounds', () => {
    cy.contains('Common').click();

    cy.getBySel('content-list-item').should('have.length.lessThan', 389);
  });

  it('should filter based on uncommon backgrounds', () => {
    cy.contains('Uncommon').click();

    cy.getBySel('content-list-item').should('have.length.lessThan', 389);
  });

  it('should filter based on rare backgrounds', () => {
    cy.contains('Rare').click();

    cy.getBySel('content-list-item').should('have.length.lessThan', 389);
  });

  describe('Background Selection', () => {
    beforeEach(() => {
      cy.get('@listContent').contains('Acolyte').click();
    });

    it('should display details', () => {
      cy.getBySel('detail-pane-header')
        .invoke('text')
        .should('contain', 'Acolyte');
      cy.getBySel('detail-pane-content')
        .invoke('text')
        .should('to.match', /.+/);
    });

    it('should display options for restricted boost selection', () => {
      cy.getBySel('restricted-boosts').should('be.visible');
      cy.getBySel('restricted-boost-int').should('be.visible');
      cy.getBySel('restricted-boost-wis').should('be.visible');
    });

    it('should update ability scores on restricted boost selection', () => {
      cy.getBySel('ability-score-wis').as('wisdom');

      cy.get('@wisdom').should('contain.text', '10');
      cy.getBySel('restricted-boost-wis').click();
      cy.get('@wisdom').should('contain.text', '12');
    });

    it('should update ability scores on free boost selection', () => {
      cy.getBySel('ability-boost-int')
        .not('.Mui-disabled')
        .first()
        .as('int-boost');

      cy.getBySel('ability-score-int').as('int');

      // 10 + 2 from wizard class
      cy.get('@int').should('contain.text', '12');
      cy.get('@int-boost').click();
      cy.get('@int').should('contain.text', '14');
    });
  });
});
