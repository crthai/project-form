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
    document.getElementById('cityAutoComplete').disabled = false;
    if (stateInput.value !== feedback.selection.value.sigla) {
      document.getElementById('cityAutoComplete').value = '';
      stateInput.value = feedback.selection.value.sigla;
    }
  });

  stateAutoComplete.input.addEventListener('open', async () => {
    document.getElementById('cityAutoComplete').disabled = true;
  });
};

const loadCities = async () => {
  const $cityInput = document.getElementById('cityAutoComplete');

  const config = {
    selector: '#cityAutoComplete',
    placeHolder: 'Search for a city...',
    data: {
      src: async () => {
        try {
          $cityInput.setAttribute('placeholder', 'Loading...');
          const uf = document.getElementById('state').value;
          let data = [];
          if (uf) {
            data = await getCities(uf);
          }
          $cityInput
            .setAttribute('placeholder', 'Search for a city...');
          return data;
        } catch (error) {
          return error;
        }
      },
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
    events: {
      input: {
        focus: () => {
          // eslint-disable-next-line no-use-before-define
          if (citiesAutoComplete.input.value.length) {
            // eslint-disable-next-line no-use-before-define
            citiesAutoComplete.start();
          }
        },
      },
    },
  };
  const citiesAutoComplete = new AutoComplete(config);

  citiesAutoComplete.input.addEventListener('selection', async (event) => {
    const feedback = event.detail;
    const selection = `${feedback.selection.value.nome}`;
    citiesAutoComplete.input.value = selection;
  });
};

window.addEventListener('load', async () => {
  await loadStates();
  await loadCities();
});


// 4 - ao apagar o select de estado, o select de cidade deve ser apagado tambem (opçoes e valor) e ficar bloqueado
