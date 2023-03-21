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

const showLoadingAnimation = ($form) => {
  const $submitButton = $form.querySelector('button[type="submit"]');
  $submitButton.disabled = true;

  const $inputs = $form.querySelectorAll('input');
  $inputs.forEach(($input) => {
    $input.disabled = true;
  });

  setTimeout(() => {
    $submitButton.innerHTML = '<div class="loader"></div>';
  }, 1);
};

const hideLoadingAnimation = ($form) => {
  const $submitButton = $form.querySelector('button[type="submit"]');
  $submitButton.disabled = false;
  
  const $inputs = $form.querySelectorAll('input');
  $inputs.forEach(($input) => {
    $input.disabled = false;
  });

  $submitButton.innerHTML = 'Submit';

  
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
    response = await post({name, email});
    showAlert(`O usuário ${response.json.name} foi registrado com o e-mail ${response.json.email}`);
  } catch (err) {
    showAlert(err.message)
  }
};

const setupSubmitEvent = () => {
  const $submitForm = document.getElementById('form');
  if ($submitForm) {
    $submitForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        showLoadingAnimation($submitForm);
        const validForm = validator.validateForm($submitForm);
        const $submitButton = $submitForm.querySelector('button[type="submit"]');


        if (validForm) {
          await postData($submitForm);
          hideLoadingAnimation($submitForm);
          console.log($submitButton);
        } else {
          console.log($submitButton);
          hideLoadingAnimation($submitForm);
        }
      } catch (err) {
        showAlert(err.message);
      }
    });
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
