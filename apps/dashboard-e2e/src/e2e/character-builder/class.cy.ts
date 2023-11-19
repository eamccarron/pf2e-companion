import { features } from '../../features';

describe('Character Creation', () => {
  beforeEach(() => {
    cy.navigateToFeature(features.characterBuilder.class);
  });

  it('should display a list of class descriptions', () => {
    cy.getBySel('content-list').each((listItem) => {
      expect(listItem.text()).to.not.be.empty;
      expect(listItem).to.be.visible;
    });
  });

  it('Should display key ability for each class', () => {
    cy.getBySel('content-list').each((listItem) => {
      expect(listItem.text()).to.match(/Key Ability: \w(,\w)?/);
    });
  });

  it('Should display starting HP for each class', () => {
    cy.getBySel('content-list').each((listItem) => {
      expect(listItem.text()).to.match(/Starting HP: \d+/);
    });
  });

  it('Should not display detail until a character is clicked', () => {
    cy.getBySel('detail-pane-header').should('not.be.visible');
  });

  it('Should display detail when a class is clicked', () => {
    cy.getBySel('content-list-button').first().click();
    cy.getBySel('detail-pane-header').should('be.visible');
    cy.getBySel('detail-pane-content').should('be.visible');
  });

  it('Should navigate to ability scores when next is clicked', () => {
    cy.getBySel('character-creation-next').click();
    cy.getBySel('ability-score-str').should('be.visible');
  });
});
