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
});
