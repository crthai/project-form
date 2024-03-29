import AutoComplete from '@tarekraafat/autocomplete.js';
import { getCities } from '../services/ibgeService';

class CityAutoComplete {
  CITY_AUTOCOMPLETE_ID = 'cityAutoComplete';

  $cityAutocompleteInput = document.getElementById(this.CITY_AUTOCOMPLETE_ID);

  $cityAutoComplete = null;

  constructor($stateAutoComplete) {
    this.$cityAutoComplete = new AutoComplete(CityAutoComplete.getConfig());
    this.registerEvents(this.$cityAutoComplete);

    $stateAutoComplete.subscribe(this.stateAutoCompleteObserverHandler.bind(this));
  }

  async loadData(state) {
    this.$cityAutocompleteInput.value = '';
    this.$cityAutocompleteInput.setAttribute('placeholder', 'Loading...');
    const data = await getCities(state);
    this.$cityAutocompleteInput
      .setAttribute('placeholder', 'Search for a city...');
    this.$cityAutoComplete.data.src = data;
  }

  static setElementInnerHtml(item, data) {
    // eslint-disable-next-line no-param-reassign
    item.innerHTML = `${data.value.nome}`;
  }

  static addMatchingResultsInfo(list, data) {
    const info = document.createElement('p');
    if (data.results.length > 0) {
      info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
    } else {
      info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
    }
    list.prepend(info);
  }

  static getConfig() {
    const config = {
      selector: '#cityAutoComplete',
      placeHolder: 'Search for a city...',
      data: {
        src: [],
        keys: ['nome'],
      },
      resultItem: {
        highlight: true,
        element: CityAutoComplete.setElementInnerHtml,
      },
      threshold: 2,
      debounce: 300,
      diacritics: true,
      resultsList: {
        element: CityAutoComplete.addMatchingResultsInfo,
        noResults: true,
        maxResults: 15,
        tabSelect: true,
      },
    };

    return config;
  }

  selectionEventHandler(event) {
    const feedback = event.detail;
    const selectionValue = `${feedback.selection.value.nome}`;
    this.$cityAutocompleteInput.value = selectionValue;
  }

  focusEventHandler() {
    this.$cityAutoComplete.start();
  }

  registerEvents($autocompleteInstace) {
    $autocompleteInstace.input.addEventListener('selection', this.selectionEventHandler.bind(this));
    $autocompleteInstace.input.addEventListener('focus', this.focusEventHandler.bind(this));
  }

  stateAutoCompleteObserverHandler(event, data) {
    if (event === 'open') {
      this.$cityAutocompleteInput.disabled = true;
    }

    if (event === 'close') {
      this.$cityAutocompleteInput.disabled = false;
    }

    if (event === 'select') {
      this.$cityAutocompleteInput.disabled = false;
      if (data) {
        this.$cityAutocompleteInput.value = '';
        this.loadData(data);
      }
    }
  }
}

export default CityAutoComplete;
