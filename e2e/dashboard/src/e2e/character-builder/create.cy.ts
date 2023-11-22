describe('Character Creation', () => {
  beforeEach(() => {
    cy.visit('/character-builder');
  });

  it('Should display a stepper', () => {
    cy.getBySel('character-creation-stepper').should('be.visible');
  });
});
