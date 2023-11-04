beforeEach(() => {
  cy.visit('/character-builder/ability-scores');

  cy.getBySel('content-list-item').as('listContent');
  cy.getBySel('content-list').as('list');
  cy.getBySel('background-tab').as('backgroundTab');
});

describe('Character Creation - Ability Scores', () => {
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
      cy.get('@intelligence').should('contain.text', '10');

      cy.get('@listContent').contains('Elf').click();

      cy.get('@dexterity').should('contain.text', '12');
      cy.get('@intelligence').should('contain.text', '12');
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
      cy.get('@strength')
        .nextAll()
        .not('.Mui-disabled')
        .should('have.length', 3);
    });
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
});
