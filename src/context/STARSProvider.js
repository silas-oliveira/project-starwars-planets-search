import PropTypes from 'prop-types';
import React, { useState } from 'react';
import getPlanets from '../services/api';
import STARSContext from './STARSContext';

function STARSProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  async function planetsAPI() {
    const starsPlanet = await getPlanets();
    console.log(starsPlanet);
    setPlanets(starsPlanet);
  }

  return (
    <STARSContext.Provider value={ { planetsAPI, planets } }>
      { children }
    </STARSContext.Provider>
  );
}

STARSProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default STARSProvider;
