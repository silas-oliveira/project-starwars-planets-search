import React, { useContext, useEffect, useState } from 'react';
import STARSContext from '../context/STARSContext';

function Table() {
  const { namesFiltered, planets } = useContext(STARSContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (namesFiltered.length === 0) {
      setLoading(true);
    }

    if (namesFiltered.length !== 0) {
      setLoading(false);
    }
  }, [namesFiltered, planets]);

  return (
    <div>
      <p>Table</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {!loading && namesFiltered.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
