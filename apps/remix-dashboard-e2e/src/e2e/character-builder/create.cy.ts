describe('Character Creation', () => {
  beforeEach(() => {
    cy.visit('/character-builder');
  });

  it('Should display a stepper', () => {
    cy.getBySel('character-creation-stepper').should('be.visible');
  });

  it('should navigate to class selection page', () => {
    cy.url().should('include', '/character-builder/class');
  });

  it('should navigate to active step if route does not match', () => {
    cy.visit('/character-builder/ability-scores');
    cy.url().should('include', '/character-builder/class');
  });
});
