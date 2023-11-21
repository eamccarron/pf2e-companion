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
    type featureSelections = Partial<{
      characterBuilder: Partial<{
        className: string;
        ancestryName: string;
        backgroundName: string;
      }>;
    }>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(email: string, password: string): void;
      getBySel(selector: string, ...args: any[]): Chainable<any>;
      navigateToFeature(feature: string, selections?: featureSelections): void;
    }
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add(
  'navigateToFeature',
  (feature, selections = {}, ...args) => {
    switch (feature) {
      case features.characterBuilder.class:
        cy.visit('/character-builder');
        cy.getBySel('content-list-item').as('listContent');
        cy.getBySel('character-creation-next').as('nextButton');
        break;
      case features.characterBuilder.abilityScores:
        cy.navigateToFeature(features.characterBuilder.class, selections);
        cy.get('@listContent')
          .contains(selections?.characterBuilder?.className ?? 'Fighter')
          .click();
        cy.get('@nextButton').scrollIntoView();
        cy.get('@nextButton').click();
        break;
      case features.characterBuilder.feats:
        cy.navigateToFeature(
          features.characterBuilder.abilityScores,
          selections
        );
        cy.get('@listContent')
          .contains(selections?.characterBuilder?.ancestryName ?? 'Human')
          .click();
        cy.getBySel('background-tab').click();
        cy.get('@listContent')
          .contains(selections?.characterBuilder?.backgroundName ?? 'Barkeep')
          .click();

        cy.location('search').should('contain', 'ancestryId=IiG7DgeLWYrSNXuX');

        cy.get('@nextButton').scrollIntoView();
        cy.get('@nextButton').click();
        break;
    }
  }
);

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
