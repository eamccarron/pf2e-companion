describe('Characters Page', () => {
  beforeEach(() => {
    cy.visit('/characters');
    cy.reload(true);
  });

  it('should display a header with the text "Characters"', () => {
    cy.contains('h2', 'Characters');
  });

  it('should display a list of characters', () => {
    cy.getBySel('content-list').each((listItem) => {
      expect(listItem.text()).to.exist;
      expect(listItem).to.be.visible;
    });
  });

  it('should display class and level for each character', () => {
    cy.getBySel('content-list').each((listItem) => {
      expect(listItem.text()).to.match(/\w \d+/);
    });
  });

  it('Should not display detail until a character is clicked', () => {
    cy.getBySel('detail-pane-header').should('not.be.visible');
  });

  it('Should display detail when a character is clicked', () => {
    cy.getBySel('content-list-button').first().click();
    cy.getBySel('detail-pane-header').should('be.visible');
    cy.getBySel('detail-pane-content').should('be.visible');
  });

  // Temporarily removed FAB link until a better spot is found for it.
  it.skip('Should navigate to character creation when FAB is clicked', () => {
    cy.getBySel('fab-link').click();
    cy.url().should('include', 'character-builder');
  });
});
