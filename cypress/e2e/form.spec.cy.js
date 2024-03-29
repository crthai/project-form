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

describe('loader', () => {
  it('should toggle button disable and animation', () => {
    cy.visit('http://localhost:1234/');

    cy.get('#button-submit').should('be.enabled');
    cy.get('#name').type('Fulana da Silva').should('have.value', 'Fulana da Silva');
    cy.get('#email').type('fulaninha@gmail.com').should('have.value', 'fulaninha@gmail.com');
    cy.get('#button-submit').click();
    cy.get('#button-submit').should('be.disabled');
    cy.get('#button-submit').should('have.class', 'button-loading');
  });

  it('should disable input fields when form is valid and button is clicked', () => {
    cy.visit('http://localhost:1234/');

    cy.get('#name').should('be.enabled');
    cy.get('#email').should('be.enabled');
    cy.get('#name').type('Fulana da Silva').should('have.value', 'Fulana da Silva');
    cy.get('#email').type('fulaninha@gmail.com').should('have.value', 'fulaninha@gmail.com');

    cy.get('#button-submit').click();
    cy.get('#name').should('be.disabled');
    cy.get('#email').should('be.disabled');
  });
});
