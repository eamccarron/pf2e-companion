describe('Navbar - md', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display a permanent navigation drawer on a medium screen', () => {
    cy.get('nav').should('be.visible');
    cy.getBySel('nav-list').should('be.visible');
  });
});

describe('Navbar - sm', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('iphone-6');
  });

  it('Should display a modal navigation drawer on a small screen', () => {
    cy.getBySel('nav-drawer-modal').should('not.be.visible');
    cy.getBySel('nav-list').should('not.be.visible');
  });

  it('Should expand navigation drawer when hamburger icon is clicked', () => {
    cy.getBySel('open-nav').click();
    cy.getBySel('nav-drawer-modal').should('be.visible');
    cy.getBySel('nav-list').should('be.visible');
  });
});
