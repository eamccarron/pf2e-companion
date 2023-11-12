beforeEach(() => {
  cy.visit('/character-builder/ability-scores');

  cy.getBySel('content-list-item').as('listContent');
  cy.getBySel('content-list').as('list');
  cy.getBySel('background-tab').as('backgroundTab');
});

describe('Character Creation - Ability Scores', () => {
  describe('All selections (class, background, ancestry, free)', () => {
    it('should calculate ability score modifiers based on all selections', () => {
      // Aliases
      cy.getBySel('ability-boost-str')
        .not('.Mui-disabled')
        .not('.Mui-checked')
        .first()
        .as('nextStrBoost');

      cy.getBySel('ability-boost-con')
        .not('.Mui-disabled')
        .not('.Mui-checked')
        .first()
        .as('nextConBoost');
      // Class
      cy.visit('/character-builder/class');
      cy.get('@listContent').contains('Fighter').click();
      cy.getBySel('character-creation-next').click();
      cy.getBySel('restricted-boost-str').click();

      // Ancestry
      cy.get('@listContent').contains('Human').click();
      cy.get('@nextStrBoost').click();
      cy.get('@nextConBoost').click();

      // Background
      cy.get('@backgroundTab').click();
      cy.contains('Common').click();
      cy.get('@listContent').contains('Barkeep').click();
      cy.getBySel('restricted-boost-con').click();
      cy.get('@nextStrBoost').click();

      // Free
      cy.get('@nextStrBoost').last().click();
      cy.get('@nextConBoost').last().click();
      cy.getBySel('ability-boost-dex').last().click();
      cy.getBySel('ability-boost-wis').last().click();

      cy.getBySel('ability-score-str').should('contain.text', '18');
      cy.getBySel('ability-score-con').should('contain.text', '16');
      cy.getBySel('ability-score-wis').should('contain.text', '12');
      cy.getBySel('ability-score-dex').should('contain.text', '12');
      cy.getBySel('ability-score-cha').should('contain.text', '10');
      cy.getBySel('ability-score-int').should('contain.text', '10');
    });
  });

  describe('Background and ancestry selection', () => {
    beforeEach(() => {
      cy.get('@listContent').contains('Elf').click();
      cy.get('@backgroundTab').click();
      cy.get('@listContent').contains('Acolyte').click();
    });

    it('should calculate ability score modifiers', () => {
      cy.getBySel('ability-score-int')
        .should('contain.text', '12')
        .as('intelligence');
      cy.getBySel('ability-score-dex')
        .should('contain.text', '12')
        .as('dexterity');
      cy.getBySel('ability-score-str')
        .should('contain.text', '10')
        .as('strength');

      cy.getBySel('restricted-boost-int').click();
      cy.getBySel('ability-boost-str').first().click();
      cy.getBySel('ability-boost-str').last().click();

      cy.get('@strength').should('contain.text', '14');
      cy.get('@intelligence').should('contain.text', '14');
    });
  });
});
