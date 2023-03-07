describe('template spec', () => {
  it('should pass', () => {
    cy.visit('http://localhost:1234/');
    cy.get('#name').type('Fulana da Silva');
    cy.get('#email').type('fulaninha@gmail.com');
    cy.get('#button-submit').click();
  })

  it('should fail and show a error message', () => {
    cy.visit('http://localhost:1234/');
    cy.get('#email').type('fulaninha@teste.com');
    cy.get('#button-submit').click();

    cy.get('.message-error').should("contain.text", "name cannot be blank.")
  })
})