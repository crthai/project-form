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
  const $form = document.getElementById('form');
  if ($form) {
    $form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const validForm = validator.validateForm($form);
      if (validForm) {
        await postData($form);
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
