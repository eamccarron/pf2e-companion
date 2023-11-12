beforeEach(() => {
  cy.visit('/character-builder/ability-scores');

  cy.getBySel('content-list-item').as('listContent');
  cy.getBySel('content-list').as('list');
  cy.getBySel('background-tab').as('backgroundTab');
});

describe('Backgrounds', () => {
  beforeEach(() => {
    cy.get('@backgroundTab').click();
  });

  it('should show list of backgrounds when background tab is clicked', () => {
    cy.getBySel('ancestry-list').should('not.exist');
    cy.get('@list').should('be.visible');
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
  });
});
