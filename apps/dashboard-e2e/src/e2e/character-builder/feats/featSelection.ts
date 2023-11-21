export const featSelection = () => {
  it('Should display feat options in a list', () => {
    cy.get('@featList').should('be.visible');
    cy.get('@featListContent').should('have.length.gt', 1);
    cy.get('@featListContent').each(
      (listItem) => expect(listItem).to.be.visible
    );
  });

  it('Should show detail pane when feat is selected', () => {
    cy.get('@featListContent').first().click();
    cy.getBySel('detail-pane-header').should('be.visible');
    cy.getBySel('detail-pane-content').should('be.visible');
    cy.getBySel('detail-pane-content').invoke('text').should('match', /\w+/);
  });

  it('Should show a check mark on feat option after feat is selected', () => {
    cy.getBySel('feat-selected-icon').should('not.exist');
    cy.getBySel('feat-unselected-icon').should('exist');

    cy.get('@featListContent').first().click();
    cy.getBySel('feat-selected-icon').should('exist');
  });
};
