/* eslint-disable no-undef */
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  });

  it('should register user if all data is correct', () => {
    cy.get('#name').type('Fulana da Silva').should('have.value', 'Fulana da Silva');
    cy.get('#email').type('fulaninha@gmail.com').should('have.value', 'fulaninha@gmail.com');
    cy.get('#button-submit').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('O usuário Fulana da Silva foi registrado com o e-mail fulaninha@gmail.com');
    });
  });

  it('should fail and show a error message when data is invalid', () => {
    cy.get('#email').type('fulaninha@teste.com').should('have.value', 'fulaninha@teste.com');
    cy.get('#button-submit').click();

    cy.get('.message-error').should('contain.text', 'name cannot be blank.');
  });
});
