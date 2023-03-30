/* eslint-disable no-alert */
import { validator } from './validator/validator';
import { post } from './services/httpbinService';

const navMenu = document.getElementById('nav-menu');
const toggleMenu = document.getElementById('toggle-menu');
const closeMenu = document.getElementById('close-menu');

toggleMenu.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

closeMenu.addEventListener('click', () => {
  navMenu.classList.remove('show');
});

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

const setupNavLinkEvents = () => {
  const $navLinks = document.querySelectorAll('.nav-link');
  $navLinks.forEach(($navLink) => {
    $navLink.addEventListener('mouseenter', () => {
      $navLinks.forEach(($internalNavLink) => $internalNavLink.classList.remove('active'));
      $navLink.classList.add('active');
    });
  });
};

const setupNavMenuEvents = () => {
  const $navMenus = document.querySelectorAll('.nav-menu');
  $navMenus.forEach(($navMenu) => {
    $navMenu.addEventListener('mouseleave', () => {
      const $navLink = $navMenu.parentElement.querySelector('.nav-link');
      $navLink.classList.remove('active');
    });
  });
};

const showAlert = (msg) => {
  setTimeout(() => {
    alert(msg);
  }, 300);
};

const postData = async ($form) => {
  try {
    const name = $form.querySelector('input[name="name"]').value;
    const email = $form.querySelector('input[name="email"]').value;
    const response = await post({ name, email });
    showAlert(`O usuário ${response.json.name} foi registrado com o e-mail ${response.json.email}`);
  } catch (err) {
    showAlert(err.message);
  }
};

const submitEventCallback = async (event, $form) => {
  event.preventDefault();
  try {
    toggleLoadingAnimation($form);
    const validForm = validator.validateForm($form);

    if (validForm) {
      await postData($form);
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

const setupEvents = () => {
  setupNavLinkEvents();
  setupNavMenuEvents();
  setupSubmitEvent();
};

window.addEventListener('load', () => {
  setupEvents();
});
