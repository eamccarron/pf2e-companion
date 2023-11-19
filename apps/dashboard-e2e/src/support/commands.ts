import { features } from '../features';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(email: string, password: string): void;
      getBySel(selector: string, ...args: any[]): Chainable<any>;
      navigateToFeature(feature: string): void;
    }
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('navigateToFeature', (feature, ...args) => {
  if (feature.includes('character-builder')) {
    cy.visit('/character-builder');
    cy.getBySel('content-list-item').as('listContent');
    cy.getBySel('character-creation-next').as('nextButton');
  }

  switch (feature) {
    case features.characterBuilder.class:
      break;
    case features.characterBuilder.abilityScores:
      cy.get('@listContent').contains('Wizard').click();
      cy.get('@nextButton').scrollIntoView();
      cy.get('@nextButton').click();
      break;
    case features.characterBuilder.feats:
      cy.navigateToFeature(features.characterBuilder.abilityScores);
      cy.get('@listContent').contains('Human').click();
      cy.getBySel('background-tab').click();
      cy.get('@listContent').contains('Barkeep').click();

      cy.get('@nextButton').scrollIntoView();
      cy.getBySel('@nextButton').click();
      break;
  }
});

//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
