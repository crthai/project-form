import { createBirthdayDatePicker } from '.';

describe('DatePicker', () => {
  it('should not allow future dates', () => {
    let datePicker = '';

    document.body.innerHTML = '<input id="birthday" type="text">';
    createBirthdayDatePicker();
    datePicker = document.querySelector('.pika-single');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    datePicker.value = '05/26/2023';
    datePicker.dispatchEvent(new Event('change'));

    expect(datePicker.value).toBe('');
  });
});
