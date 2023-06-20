// import AutoComplete from '@tarekraafat/autocomplete.js';
// import { getStates, getCities } from '../services/ibgeService';
// import Observable from './observable';
import StateAutoComplete from './stateAutoComplete';
import CityAutoComplete from './cityAutoComplete';

// const stateObservable = new Observable();
// const citiesObservable = new Observable();
// const $cityInput = document.getElementById('cityAutoComplete');



// const loadCities = async () => {
//   const config = {
//     selector: '#cityAutoComplete',
//     placeHolder: 'Search for a city...',
//     data: {
//       src: async () => {
//         try {
//           $cityInput.setAttribute('placeholder', 'Loading...');
//           const uf = document.getElementById('state').value;
//           let data = [];
//           if (uf) {
//             data = await getCities(uf);
//           }
//           $cityInput
//             .setAttribute('placeholder', 'Search for a city...');
//           return data;
//         } catch (error) {
//           return error;
//         }
//       },
//       keys: ['nome'],
//     },
//     resultItem: {
//       highlight: true,
//       element: (item, data) => {
//         // eslint-disable-next-line no-param-reassign
//         item.innerHTML = `${data.value.nome}`;
//       },
//     },
//     threshold: 2,
//     debounce: 300,
//     diacritics: true,
//     resultsList: {
//       element: (list, data) => {
//         const info = document.createElement('p');
//         if (data.results.length > 0) {
//           info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
//         } else {
//           info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
//         }
//         list.prepend(info);
//       },
//       noResults: true,
//       maxResults: 15,
//       tabSelect: true,
//     },
//     events: {
//       input: {
//         focus: () => {
//           // eslint-disable-next-line no-use-before-define
//           if (citiesAutoComplete.input.value.length) {
//             // eslint-disable-next-line no-use-before-define
//             citiesAutoComplete.start();
//           }
//         },
//       },
//     },
//   };
//   const citiesAutoComplete = new AutoComplete(config);

//   const loadCitiesForState = async (state) => {
//     try {
//       // Código para carregar as cidades do estado fornecido
//       const cities = await getCities(state);
//       citiesAutoComplete.data.src = () => Promise.resolve(cities);
//       citiesAutoComplete.input.value = '';
//     } catch (error) {
//       console.error('Error loading cities:', error);
//     }
//   };

//   citiesAutoComplete.input.addEventListener('selection', async (event) => {
//     const feedback = event.detail;
//     const selection = `${feedback.selection.value.nome}`;
//     citiesAutoComplete.input.value = selection;
//     citiesObservable.notify('citySelection', selection);
//   });

//   citiesObservable.subscribe((event, data) => {
//     if (event === 'stateChange') {
//       $cityInput.value = '';
//       loadCitiesForState(data);
//     }
//   });
// };

window.addEventListener('load', async () => {
  const stateAutoComplete = new StateAutoComplete();
  const cityAutoComplete = new CityAutoComplete(stateAutoComplete);
});
