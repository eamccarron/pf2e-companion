import { features } from '../../../features';

beforeEach(() => {
  cy.navigateToFeature(features.characterBuilder.abilityScores);

  cy.getBySel('content-list-item').as('listContent');
  cy.getBySel('content-list').as('list');
});

describe('Ancestries', () => {
  it('should display a list of ancestries', () => {
    cy.getBySel('content-list-item').each((listItem) => {
      expect(listItem.text()).to.exist;
    });
  });

  it('should filter based on common ancestries', () => {
    cy.contains('Common').click();

    cy.getBySel('content-list-item').should('have.length', 6);
  });

  it('should filter based on uncommon ancestries', () => {
    cy.contains('Uncommon').click();

    cy.getBySel('content-list-item').should('have.length', 15);
  });

  it('should filter based on rare ancestries', () => {
    cy.contains('Rare').click();

    cy.getBySel('content-list-item').should('have.length', 15);
  });

  it('should filter based on multiple ancestry types', () => {
    cy.contains('Rare').click();
    cy.contains('Common').click();

    cy.getBySel('content-list-item').should('have.length', 21);
  });

  it('should show details when an ancestry is clicked', () => {
    cy.getBySel('content-list-item').first().click();

    cy.getBySel('detail-pane-header').should('be.visible');
    cy.getBySel('detail-pane-content').should('be.visible');
  });

  it('should update ability scores when boost is selected', () => {
    cy.get('@listContent').contains('Elf').click();
    cy.getBySel('ability-score-str').as('abilityScore');
    cy.get('@abilityScore').should('contain.text', '10');

    cy.getBySel('ability-boost-str').first().click();
    cy.get('@abilityScore').should('contain.text', '12');
  });

  it('should set ability boosts to disabled if they are fixed for the selected ancestry', () => {
    cy.get('@listContent').contains('Elf').click();
    cy.getBySel('ability-boost-dex')
      .first()
      .should('have.class', 'Mui-disabled');

    cy.getBySel('ability-boost-cha')
      .first()
      .should('not.have.class', 'Mui-disabled');
  });

  it('should adjust ability scores based on fixed boosts for selected ancestry', () => {
    cy.getBySel('ability-score-dex').as('dexterity');
    cy.getBySel('ability-score-int').as('intelligence');

    cy.get('@dexterity').should('contain.text', '10');
    // 10 + 2 from Wizard class
    cy.get('@intelligence').should('contain.text', '12');

    cy.get('@listContent').contains('Elf').click();

    // 10 + 2 from Elf ancestry
    cy.get('@dexterity').should('contain.text', '12');
    // 10 + 2 from Wizard class + 2 from Elf ancestry
    cy.get('@intelligence').should('contain.text', '14');
  });

  it('should disable ability score boosts after all free boosts have been selected', () => {
    cy.getBySel('ability-boost-str').first().as('strength');

    cy.get('@listContent').contains('Elf').click();
    cy.get('@strength').click();
    cy.get('@strength')
      .nextAll()
      .each((boost) => {
        expect(boost).to.have.class('Mui-disabled');
      });
  });

  it('should re-enable ability score boosts after free boost has been de-selected', () => {
    cy.getBySel('ability-boost-str').first().as('strength');

    cy.get('@listContent').contains('Elf').click();
    cy.get('@strength').click();
    cy.get('@strength').click();
    cy.get('@strength').nextAll().not('.Mui-disabled').should('have.length', 3);
  });
});
