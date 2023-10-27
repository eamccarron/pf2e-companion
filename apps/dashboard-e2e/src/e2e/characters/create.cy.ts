describe('Character Creation', () => {
  beforeEach(() => {
    cy.visit('/character-builder');
  });

  it('should navigate to class selection page', () => {
    cy.url().should('include', '/characters/create/character-class');
  });

  it('Should display a stepper', () => {
    cy.getBySel('character-creation-stepper').should('be.visible');
  });
});
