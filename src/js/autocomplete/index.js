import AutoComplete from '@tarekraafat/autocomplete.js';
import { getStates, getCities } from '../services/ibgeService';

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
        // eslint-disable-next-line no-param-reassign
        item.innerHTML = `${data.value.nome} - ${data.value.sigla}`;
      },
    },
    threshold: 2,
    debounce: 300,
    diacritics: true,
    resultsList: {
      element: (list, data) => {
        const info = document.createElement('p');
        if (data.results.length > 0) {
          info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
        } else {
          info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
        }
        list.prepend(info);
      },
      noResults: true,
      maxResults: 15,
      tabSelect: true,
    },
  };
  const stateAutoComplete = new AutoComplete(config);
  const stateInput = document.getElementById('state');

  stateAutoComplete.input.addEventListener('selection', async (event) => {
    const feedback = event.detail;
    const selection = `${feedback.selection.value.nome} - ${feedback.selection.value.sigla}`;
    stateAutoComplete.input.value = selection;
    stateInput.value = selection;
    await loadCities(feedback.selection.value.sigla);
  });

  stateAutoComplete.input.addEventListener('open', async () => {
    stateInput.value = '';
    await loadCities();
  });
};

const loadCities = async (uf) => {
  let cities = [];
  const $cityInput = document.getElementById('cityAutoComplete');
  if (typeof uf === 'string' && uf.length === 2) {
    $cityInput.disabled = true;
    cities = await getCities(uf);
  }
  const config = {
    selector: '#cityAutoComplete',
    placeHolder: 'Search for a city...',
    data: {
      src: cities,
      keys: ['nome'],
    },
    resultItem: {
      highlight: true,
      element: (item, data) => {
        // eslint-disable-next-line no-param-reassign
        item.innerHTML = `${data.value.nome}`;
      },
    },
    threshold: 2,
    debounce: 300,
    diacritics: true,
    resultsList: {
      element: (list, data) => {
        const info = document.createElement('p');
        if (data.results.length > 0) {
          info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
        } else {
          info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
        }
        list.prepend(info);
      },
      noResults: true,
      maxResults: 15,
      tabSelect: true,
    },
  };
  const citiesAutoComplete = new AutoComplete(config);

  citiesAutoComplete.input.addEventListener('selection', async (event) => {
    const feedback = event.detail;
    const selection = `${feedback.selection.value.nome}`;
    citiesAutoComplete.input.value = selection;
  });
  if (cities.length) {
    $cityInput.disabled = false;
  }
};

window.addEventListener('load', async () => {
  await loadStates();
  await loadCities();
  // setupStateChangeEvent();
});

// 2 - ao escolher uma opção no select de estados, o select de cidades deve ser preenchido com as opções das cidades daquele estado
// 3 - ao apagar o valor do select de cidade, nada acontece
// 4 - ao apagar o select de estado, o select de cidade deve ser apagado tambem (opçoes e valor) e ficar bloqueado
// 5 - ao selecionar um novo estado, o select de cidade carrega as opçoes e desbloqueia
