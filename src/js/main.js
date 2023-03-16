/* eslint-disable no-alert */
import { validator } from './validator';
import { postData } from './post';

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
const showSucessAlert = ($form) => {
  setTimeout(() => {
    const name = $form.querySelector('input[name="name"]').value;
    const email = $form.querySelector('input[name="email"]').value;

    postData('https://httpbin.org/post', {
      name,
      email,
    }).then((data) => {
      alert(`O usuário ${data.json.name} foi registrado com o e-mail ${data.json.email}`);
    }).catch((error) => console.log(error));
  });
};

const setupSubmitEvent = () => {
  const $form = document.getElementById('form');
  if ($form) {
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      const validForm = validator.validateForm($form);
      if (validForm) {
        showSucessAlert($form);
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
