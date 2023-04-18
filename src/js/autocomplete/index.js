import AutoComplete from '@tarekraafat/autocomplete.js';
import { getStates } from '../services/ibgeService';

// const cityListElement = document.getElementById('city-list');
// const cityInputElement = document.getElementById('city');
// const stateElement = document.getElementById('state');

// const loadCities = async (cities, element, searchTerm) => {
//   if (cities) {
//     const filteredCities = searchTerm
//       ? cities.filter((city) => city.nome.toLowerCase().includes(searchTerm.toLowerCase()))
//       : cities;
//     element.innerHTML = filteredCities
//       .map((city) => {
//         const cityItem = document.createElement('li');
//         cityItem.textContent = city.nome;
//         return cityItem.outerHTML;
//       })
//       .join('');
//   }
// };

// cityListElement.addEventListener('click', (event) => {
//   if (event.target && event.target.nodeName === 'LI') {
//     cityInputElement.value = event.target.textContent;

//     const cityItems = document.querySelectorAll('#city-list li');
//     cityItems.forEach((item) => {
//       item.style.display = 'none';
//     });
//   }
// });

// cityInputElement.addEventListener('input', async () => {
//   const state = stateElement.value;
//   const cities = await getCities(state);
//   const searchTerm = cityInputElement.value;
//   loadCities(cities, cityListElement, searchTerm);
// });

// 1 - ao carregar a página, o select de estado deve ser preenchido com as opções dos estado brasileiros
const loadStates = async () => {
  const states = await getStates();
  const config = {
    selector: '#stateAutoComplete',
    placeHolder: 'Search for a UF...',
    data: {
      src: states,
      keys: ['nome', 'sigla'],
    },
    resultItem: {
      highlight: true,
      element: (item, data) => {
        item.innerHTML = `${data.value.nome} - ${data.value.sigla}`;
      },
    },
    threshold: 2,
    debounce: 300,
    diacritics: true,
  };
  const stateAutoComplete = new AutoComplete(config);
};

window.addEventListener('load', async () => {
  await loadStates();
  // setupStateChangeEvent();
});

// 2 - ao escolher uma opção no select de estados, o select de cidades deve ser preenchido com as opções das cidades daquele estado
// 3 - ao apagar o valor do select de cidade, nada acontece
// 4 - ao apagar o select de estado, o select de cidade deve ser apagado tambem (opçoes e valor) e ficar bloqueado
// 5 - ao selecionar um novo estado, o select de cidade carrega as opçoes e desbloqueia
