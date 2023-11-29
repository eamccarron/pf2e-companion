import { features } from '../../../features';

describe('Free ability boosts', () => {
  beforeEach(() => {
    cy.navigateToFeature(features.characterBuilder.abilityScores);

    cy.getBySel('content-list-item').as('listContent');
    cy.getBySel('ability-score-dex');

    cy.getBySel('ability-boost-str').last().as('str-boost');
    cy.getBySel('ability-boost-dex').last().as('dex-boost');
    cy.getBySel('ability-boost-con').last().as('con-boost');
    cy.getBySel('ability-boost-int').last().as('int-boost');
    cy.getBySel('ability-boost-wis').last().as('wis-boost');
    cy.getBySel('ability-boost-cha').last().as('cha-boost');
  });

  it('should display free ability boost buttons as enabled', () => {
    cy.getBySel('ability-boost-str').last().should('not.have.attr', 'disabled');
    cy.getBySel('ability-boost-dex').last().should('not.have.attr', 'disabled');
    cy.getBySel('ability-boost-con').last().should('not.have.attr', 'disabled');
    cy.getBySel('ability-boost-int').last().should('not.have.attr', 'disabled');
    cy.getBySel('ability-boost-wis').last().should('not.have.attr', 'disabled');
    cy.getBySel('ability-boost-cha').last().should('not.have.attr', 'disabled');
  });

  [
    ['str', 'dex', 'con', 'int'],
    ['wis', 'cha', 'str', 'dex'],
    ['con', 'int', 'wis', 'cha'],
  ].forEach((selection, index, selectionSet) => {
    it(`should update ability scores based on free ability score selection (${selection})`, () => {
      selection.forEach((ability) => {
        cy.get(`@${ability}-boost`).click();
      });

      selection.forEach((ability) => {
        cy.getBySel(`ability-score-${ability}`).should('contain.text', '12');
      });
    });

    it(`should allow free ability boosts to be re-assigned (${selection})`, () => {
      if (index + 1 > selectionSet.length - 1) return;

      selection.forEach((ability, boostIndex) => {
        cy.get(`@${ability}-boost`).as(`boost-${boostIndex}`);
        cy.get(`@${ability}-boost`).click();
      });

      selectionSet[index + 1].forEach((ability, boostIndex) => {
        cy.get(`@boost-${boostIndex}`).click();
        cy.get(`@${ability}-boost`).click();
        cy.getBySel(`ability-score-${ability}`).should('contain.text', '12');
      });
    });
  });

  it('should persist ability scores between character creation stages', () => {
    cy.get('@str-boost').click();
    cy.get('@dex-boost').click();
    cy.get('@con-boost').click();
    cy.get('@int-boost').click();

    cy.getBySel('character-creation-next').click();

    cy.getBySel('ability-score-str').should('contain.text', '12');
    cy.getBySel('ability-score-dex').should('contain.text', '12');
    cy.getBySel('ability-score-con').should('contain.text', '12');
    cy.getBySel('ability-score-int').should('contain.text', '12');

    cy.getBySel('character-creation-back').click();

    cy.getBySel('ability-score-str').should('contain.text', '12');
    cy.getBySel('ability-score-dex').should('contain.text', '12');
    cy.getBySel('ability-score-con').should('contain.text', '12');
    cy.getBySel('ability-score-int').should('contain.text', '12');

    cy.getBySel('character-creation-back').click();
    cy.getBySel('character-creation-next').click();

    cy.getBySel('ability-score-str').should('contain.text', '12');
    cy.getBySel('ability-score-dex').should('contain.text', '12');
    cy.getBySel('ability-score-con').should('contain.text', '12');
    cy.getBySel('ability-score-int').should('contain.text', '12');
  });
});
