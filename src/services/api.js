const getPlanets = async () => {
  const requestAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
  const resposeAPI = await requestAPI.json();
  const { results } = resposeAPI;
  results.forEach((element) => delete element.residents);
  return results;
};

export default getPlanets;
