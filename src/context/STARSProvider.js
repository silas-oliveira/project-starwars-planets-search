import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanets from '../services/api';
import STARSContext from './STARSContext';

function STARSProvider({ children }) {
  const INITIA_STATE = {
    filterByName: {
      name: '',
    },
    filterByOshiroDoMal: {
      oshiro: '',
    },
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
      const { filterByName } = filters;
      if (filterByName.name !== '') {
        planetsFiltered = planetsFiltered
          .filter((element) => element.name.includes(filterByName.name));
      }
      setNamesFiltered(planetsFiltered);
    }
  }, [filters, planets]);

  function handleChange({ target }, filter) {
    const { name, value } = target;

    setFilters({ ...filters, [filter]: { [name]: value } });
  }

  return (
    <STARSContext.Provider
      value={ { planets, handleChange, filters, namesFiltered } }
    >
      { children }
    </STARSContext.Provider>
  );
}

STARSProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default STARSProvider;
