import { setupMenuEvents } from './menu/menu';
import { setupSubmitEvent } from './form/form';

const setupEvents = () => {
  setupMenuEvents();
  setupSubmitEvent();
};

window.addEventListener('load', () => {
  setupEvents();
});
