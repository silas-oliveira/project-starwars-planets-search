import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanets from '../services/api';
import STARSContext from './STARSContext';

function STARSProvider({ children }) {
  const INITIA_STATE = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIA_STATE);
  const [namesFiltered, setNamesFiltered] = useState([]);

  async function planetsAPI() {
    const starsPlanet = await getPlanets();
    setPlanets(starsPlanet);
  }

  useEffect(() => {
    planetsAPI();
  }, []);

  useEffect(() => {
    if (planets.length !== 0) {
      let planetsFiltered = [...planets];
      // console.log('let', planetsFiltered);
      const { filterByName } = filters;
      if (filterByName.name !== '') {
        planetsFiltered = planetsFiltered
          .filter((element) => element.name.includes(filterByName.name));
      }
      const { filterByNumericValues } = filters;
      // console.log('filter', filterByNumericValues);
      filterByNumericValues.forEach((filter) => {
        if (filter.comparison === 'maior que') {
          // console.log('forEach', filter);
          // reatribuição do novo filtro com base no filtro anterior, By T
          planetsFiltered = planetsFiltered
            .filter((planet) => +planet[filter.column] > +filter.value);
          // console.log('filter', planet);
          // console.log('filter Value', +filter.value);
        }
        if (filter.comparison === 'menor que') {
          // reatribuição do novo filtro com base no filtro anterior, By T
          planetsFiltered = planetsFiltered
            .filter((planet) => +planet[filter.column] < +filter.value);
        }
        if (filter.comparison === 'igual a') {
          // reatribuição do novo filtro com base no filtro anterior, By T
          planetsFiltered = planetsFiltered
            .filter((planet) => +planet[filter.column] === +filter.value);
        }
      });
      setNamesFiltered(planetsFiltered);
    }
  }, [filters, planets]);

  function handleChange({ target }, filter) {
    const { name, value } = target;

    setFilters({ ...filters, [filter]: { [name]: value } });
  }

  function addFilterNumeric(inputNumeric) {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, inputNumeric] });
  }

  function removeFilterNumeric(columnName) {
    const { filterByNumericValues } = filters;

    const removedColumn = filterByNumericValues
      .filter((select) => select.column !== columnName);

    setFilters({
      ...filters,
      filterByNumericValues: removedColumn,
    });
  }

  return (
    <STARSContext.Provider
      value={ {
        planets,
        handleChange,
        filters,
        namesFiltered,
        addFilterNumeric,
        removeFilterNumeric,
      } }
    >
      { children }
    </STARSContext.Provider>
  );
}

STARSProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default STARSProvider;
