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

window.addEventListener('load', () => {
  setupNavLinkEvents();
  setupNavMenuEvents();
});
