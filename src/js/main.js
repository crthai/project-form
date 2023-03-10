import { validator } from './validator';

const navMenu = document.getElementById('nav-menu'),
  toggleMenu = document.getElementById('toggle-menu'),
  closeMenu = document.getElementById('close-menu');

toggleMenu.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

closeMenu.addEventListener('click', () => {
  navMenu.classList.remove('show');
});

const setupEvents = () => {
  setupNavLinkEvents();
  setupNavMenuEvents();
  setupSubmitEvent();
};

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

const setupNavLinkEvents = () => {
  const $navLinks = document.querySelectorAll('.nav-link');
  $navLinks.forEach(function ($navLink) {
    $navLink.addEventListener('mouseenter', function () {
      $navLinks.forEach(($internalNavLink) =>
        $internalNavLink.classList.remove('active')
      );
      $navLink.classList.add('active');
    });
  });
};

const setupNavMenuEvents = () => {
  const $navMenus = document.querySelectorAll('.nav-menu');
  $navMenus.forEach(function ($navMenu) {
    $navMenu.addEventListener('mouseleave', function () {
      const $navLink = $navMenu.parentElement.querySelector('.nav-link');
      $navLink.classList.remove('active');
    });
  });
};
const showSucessAlert = ($form) => {
  setTimeout(() => {
    const name = $form.querySelector('input[name="name"]').value;
    const email = $form.querySelector('input[name="email"]').value;
    alert(`O usuário ${name} foi registrado com o e-mail ${email}`);
  }, 1);
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

window.addEventListener('load', (event) => {
  setupEvents();
});
