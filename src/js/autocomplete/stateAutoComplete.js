import AutoComplete from '@tarekraafat/autocomplete.js';
import { getStates } from '../services/ibgeService';
import Observable from './observable';

class StateAutoComplete extends Observable {
  STATE_AUTOCOMPLETE_ID = 'stateAutoComplete';

  constructor() {
    super();
    this.$stateAutocompleteInput = document.getElementById(this.STATE_AUTOCOMPLETE_ID);
    this.$stateInputTracker = document.getElementById('state');
    const $stateAutoComplete = new AutoComplete(this.getConfig());
    this.registerEvents($stateAutoComplete);
  }

  async loadData() {
    this.$stateAutocompleteInput.setAttribute('placeholder', 'Loading...');
    const data = await getStates();
    this.$stateAutocompleteInput
      .setAttribute('placeholder', 'Search for a UF...');
    return data;
  }

  static setElementInnerHtml(item, data) {
    // eslint-disable-next-line no-param-reassign
    item.innerHTML = `${data.value.nome} - ${data.value.sigla}`;
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

  getConfig() {
    const config = {
      selector: '#stateAutoComplete',
      placeHolder: 'Search for a UF...',
      data: {
        src: this.loadData.bind(this),
        cache: true,
        keys: ['nome'],
      },
      resultItem: {
        highlight: true,
        element: StateAutoComplete.setElementInnerHtml,
      },
      threshold: 2,
      debounce: 300,
      diacritics: true,
      resultsList: {
        element: StateAutoComplete.addMatchingResultsInfo,
        noResults: true,
        maxResults: 15,
        tabSelect: true,
      },
    };

    return config;
  }

  selectionEventHandler(event) {
    const feedback = event.detail;
    const selectionValue = `${feedback.selection.value.nome} - ${feedback.selection.value.sigla}`;
    this.$stateAutocompleteInput.value = selectionValue;
    this.notify('select');

    if (this.$stateInputTracker.value !== feedback.selection.value.sigla) {
      this.$stateInputTracker.value = feedback.selection.value.sigla;
      this.$stateInputTracker.dataset.selection = selectionValue;
      this.notify('select', feedback.selection.value.sigla);
    }
  }

  openEventHandler() {
    this.notify('open');
  }

  closeEventHandler() {
    if (this.$stateInputTracker.dataset.selection) {
      this.$stateAutocompleteInput.value = this.$stateInputTracker.dataset.selection;
      this.notify('close');
    }
  }

  registerEvents($autocompleteInstace) {
    $autocompleteInstace.input.addEventListener('selection', this.selectionEventHandler.bind(this));
    $autocompleteInstace.input.addEventListener('open', this.openEventHandler.bind(this));
    $autocompleteInstace.input.addEventListener('close', this.closeEventHandler.bind(this));
  }
}

export default StateAutoComplete;
