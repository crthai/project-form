const getStates = async () => {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const states = await response.json();
    return states;
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

export { getStates, getCities };
