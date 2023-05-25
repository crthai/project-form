import AutoComplete from '@tarekraafat/autocomplete.js';
import { getStates, getCities } from '../services/ibgeService';

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(event, data) {
    this.observers.forEach((observer) => observer(event, data));
  }
}

const stateObservable = new Observable();
const citiesObservable = new Observable();
const $cityInput = document.getElementById('cityAutoComplete');

const loadStates = async () => {
  const config = {
    selector: '#stateAutoComplete',
    placeHolder: 'Search for a UF...',
    data: {
      src: async () => {
        try {
          const $stateAutocompleteInput = document.getElementById('stateAutoComplete');
          $stateAutocompleteInput.setAttribute('placeholder', 'Loading...');
          const data = await getStates();
          $stateAutocompleteInput
            .setAttribute('placeholder', 'Search for a UF...');
          return data;
        } catch (error) {
          return error;
        }
      },
      cache: true,
      keys: ['nome'],
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
  const $stateAutoComplete = new AutoComplete(config);
  const $stateInput = document.getElementById('state');

  $stateAutoComplete.input.addEventListener('selection', async (event) => {
    const feedback = event.detail;
    const selection = `${feedback.selection.value.nome} - ${feedback.selection.value.sigla}`;
    $stateAutoComplete.input.value = selection;
    document.getElementById('cityAutoComplete').disabled = false;
    if ($stateInput.value !== feedback.selection.value.sigla) {
      document.getElementById('cityAutoComplete').value = '';
      $stateInput.value = feedback.selection.value.sigla;
      $stateInput.dataset.selection = selection;
      stateObservable.notify('stateChange', feedback.selection.value.sigla);
    }
  });

  $stateAutoComplete.input.addEventListener('open', async () => {
    document.getElementById('cityAutoComplete').disabled = true;
  });

  $stateAutoComplete.input.addEventListener('close', () => {
    if ($stateInput.dataset.selection) {
      $stateAutoComplete.input.value = $stateInput.dataset.selection;
      document.getElementById('cityAutoComplete').disabled = false;
    }
  });

  stateObservable.subscribe((event, data) => {
    if (event === 'stateChange') {
      $stateInput.value = data;
      $stateInput.dataset.selection = data;
      $cityInput.value = '';
      citiesObservable.notify('stateChange', data);
    }
  });
};

const loadCities = async () => {
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

  const loadCitiesForState = async (state) => {
    try {
      // Código para carregar as cidades do estado fornecido
      const cities = await getCities(state);
      citiesAutoComplete.data.src = () => Promise.resolve(cities);
      citiesAutoComplete.input.value = '';
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  citiesAutoComplete.input.addEventListener('selection', async (event) => {
    const feedback = event.detail;
    const selection = `${feedback.selection.value.nome}`;
    citiesAutoComplete.input.value = selection;
    citiesObservable.notify('citySelection', selection);
  });

  citiesObservable.subscribe((event, data) => {
    if (event === 'stateChange') {
      $cityInput.value = '';
      loadCitiesForState(data);
    }
  });
};

window.addEventListener('load', async () => {
  await loadStates();
  await loadCities();
});
