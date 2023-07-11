/* eslint-disable no-undef */
describe('cityAutocomplete', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  });

  it('should load cities for a selected state', () => {
    cy.get('#stateAutoComplete').click();

    cy.get('#stateAutoComplete').type('Pernambuco').should('have.value', 'Pernambuco');

    cy.contains('Pernambuco - PE').click();

    cy.get('#cityAutoComplete').should('not.be.disabled');

    cy.get('#cityAutoComplete').click();

    cy.get('#cityAutoComplete').type('Itam');

    cy.contains('Itambé').click();
  });

  it('should load states successfully', () => {
    cy.get('#stateAutoComplete').click();

    cy.get('#stateAutoComplete').type('Am').should('have.value', 'Am');

    cy.contains('Amazonas - AM').should('be.visible');

    cy.contains('Amapá - AP').should('be.visible');

    cy.contains('Search for a UF...').should('not.exist');
  });

  it('should load cities for a selected state', () => {
    cy.get('#stateAutoComplete').click();

    cy.get('#stateAutoComplete').type('Pernambuco').should('have.value', 'Pernambuco');

    cy.contains('Pernambuco - PE').click();

    cy.get('#cityAutoComplete').should('not.be.disabled');

    cy.get('#cityAutoComplete').click();

    cy.get('#cityAutoComplete').type('InvalidCity');

    cy.contains('Found 0 matching results for "InvalidCity"').should('be.visible');
  });
});
