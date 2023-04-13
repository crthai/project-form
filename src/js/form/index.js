import { validator } from '../validator/validator';
import { post } from '../services/httpbinService';

const toggleButtonDisable = ($form) => {
  const $submitButton = $form.querySelector('button[type="submit"]');
  $submitButton.disabled = !$submitButton.disabled;
};

const toggleButtonAnimation = ($form) => {
  const $submitButton = $form.querySelector('button[type="submit"]');
  $submitButton.classList.toggle('button-loading');
};

const toggleInputDisable = ($form) => {
  const $inputs = $form.querySelectorAll('input');
  $inputs.forEach(($input) => {
    // eslint-disable-next-line no-param-reassign
    $input.disabled = !$input.disabled;
  });
};

const toggleLoadingAnimation = ($form) => {
  toggleButtonDisable($form);
  toggleInputDisable($form);
  toggleButtonAnimation($form);
};

const showAlert = (msg) => {
  setTimeout(() => {
    alert(msg);
  }, 300);
};

const postData = async (formData) => {
  try {
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    const parts = data.birthday.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    data.birthday = `${year}-${month}-${day}`;

    const response = await post(data);
    showAlert(`O usuário ${response.json.name} foi registrado com o e-mail ${response.json.email} e a data ${response.json.birthday}`);
  } catch (err) {
    showAlert(err.message);
  }
};

const submitEventCallback = async (event, $form) => {
  event.preventDefault();
  try {
    const formData = new FormData($form);
    toggleLoadingAnimation($form);
    const validForm = validator.validateForm($form);

    if (validForm) {
      await postData(formData);
      toggleLoadingAnimation($form);
    } else {
      toggleLoadingAnimation($form);
    }
  } catch (err) {
    showAlert(err.message);
  }
};

const setupSubmitEvent = () => {
  const $submitForm = document.getElementById('form');
  if ($submitForm) {
    $submitForm.addEventListener('submit', (e) => submitEventCallback(e, $submitForm));
  }
};

window.addEventListener('load', () => {
  setupSubmitEvent();
});
