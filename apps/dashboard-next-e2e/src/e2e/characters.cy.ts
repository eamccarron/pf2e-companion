import { getGreeting } from '../support/app.po';

describe('Characters Page', () => {
  beforeEach(() => {
    cy.visit('/characters');
  });

  it('should display a header with the text "Characters"', () => {
    cy.contains('h2', 'Characters');
  });

  it('should display a list of characters', () => {
    cy.get('ul').should('have.class', 'characters-list');
    cy.get('li').should('have.length.greaterThan', 0);
  });

  it('should display details for each character', () => {
    cy.get('li').first().click();
    cy.url().should('include', '/characters/');
    cy.get('h2').should('have.class', 'character-name');
    cy.get('p').should('have.class', 'character-description');
  });
});
