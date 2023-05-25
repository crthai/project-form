/* eslint-disable no-unused-vars */
import Pikaday from 'pikaday';

const createBirthdayDatePicker = () => {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 130);

  const addLeadingZeros = (value) => `${value}`.padStart(2, '0');

  const datepicker = new Pikaday({
    field: document.getElementById('birthday'),
    firstDay: 1,
    minDate,
    maxDate: new Date(),
    toString(date, format) {
      const day = addLeadingZeros(date.getDate());
      const month = addLeadingZeros(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    parse(dateString, format) {
      const parts = dateString.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    },
  });
};

window.addEventListener('load', () => {
  createBirthdayDatePicker();
});

export { createBirthdayDatePicker };
