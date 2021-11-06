import React, { useContext, useState } from 'react';
import STARSContext from '../context/STARSContext';

function InputsNumeric() {
  const INITIAL_STATE = {
    column: '',
    comparison: '',
    value: 0,
  };

  const [inputNumeric, setInputNumeric] = useState(INITIAL_STATE);
  const { addFilterNumeric } = useContext(STARSContext);

  function handleChange({ target }) {
    const { name, value } = target;

    setInputNumeric({ ...inputNumeric, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    addFilterNumeric(inputNumeric);
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <select
          value={ inputNumeric.column }
          onChange={ handleChange }
          data-testid="column-filter"
          name="column"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          value={ inputNumeric.comparison }
          onChange={ handleChange }
          data-testid="comparison-filter"
          name="comparison"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          value={ inputNumeric.value }
          onChange={ handleChange }
          type="number"
          name="value"
          data-testid="value-filter"
        />
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}

export default InputsNumeric;
