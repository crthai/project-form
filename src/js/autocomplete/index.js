/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { getCities } from '../services/ibgeService';

const cityListElement = document.getElementById('city-list');
const cityInputElement = document.getElementById('autocomplete-input');
const stateElement = document.getElementById('states');

const loadCities = async (cities, element, searchTerm) => {
  if (cities) {
    const filteredCities = searchTerm
      ? cities.filter((city) => city.nome.toLowerCase().includes(searchTerm.toLowerCase()))
      : cities;
    element.innerHTML = filteredCities
      .map((city) => {
        const cityItem = document.createElement('li');
        cityItem.textContent = city.nome;
        return cityItem.outerHTML;
      })
      .join('');
  }
};

cityListElement.addEventListener('click', (event) => {
  if (event.target && event.target.nodeName === 'LI') {
    cityInputElement.value = event.target.textContent;

    const cityItems = document.querySelectorAll('#city-list li');
    cityItems.forEach((item) => {
      item.style.display = 'none';
    });
  }
});

cityInputElement.addEventListener('input', async () => {
  const state = stateElement.value;
  const cities = await getCities(state);
  const searchTerm = cityInputElement.value;
  loadCities(cities, cityListElement, searchTerm);
});
