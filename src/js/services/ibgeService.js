const statesSelect = document.getElementById('states');

const getState = async () => {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const states = await response.json();
    states.forEach((state) => {
      const option = document.createElement('option');
      option.text = state.nome;
      option.value = state.sigla;
      statesSelect.add(option);
    });
  } catch (error) {
    throw new Error(`ibgeService: ${error.message}`, error);
  }
};

const getCities = async (state) => {
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);
    return response.json();
  } catch (error) {
    throw new Error(`ibgeService: ${error.message}`, error);
  }
};

export { getState, getCities };
