/* eslint-disable no-undef */
import { createBirthdayDatePicker } from '../../src/js/datapicker/index';

describe('Datepicker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/');
  });

  it('should not allow selection of future dates', () => {
    const currentDate = new Date('2023-07-10');
    cy.clock(currentDate.getTime());

    createBirthdayDatePicker();

    cy.get('#birthday').click();

    cy.get('.pika-single td.is-disabled')
      .each(($date) => {
        const dateText = $date.text().trim();
        const futureDay = currentDate.getDate() + 1;
        const futureDayText = futureDay < 10 ? `0${futureDay}` : `${futureDay}`;

        if (dateText === futureDayText) {
          cy.wrap($date).should('be.disabled');
        }
      });
  });
});
