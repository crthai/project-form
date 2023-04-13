import './menu';
import './form';
import './datapicker';
import './autocomplete';
import { getState } from './services/ibgeService';

const getStates = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await getState();
  } catch (err) {
    throw new Error(err);
  }
};
window.addEventListener('load', () => {
  getStates();
});
