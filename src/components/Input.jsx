import React, { useContext } from 'react';
import STARSContext from '../context/STARSContext';

function Input() {
  const { handleChange, filters } = useContext(STARSContext);
  return (
    <div>
      <input
        data-testid="name-filter"
        name="name"
        type="text"
        onChange={ (e) => handleChange(e, 'filterByName') }
        value={ filters.filterByName.name }
      />
    </div>
  );
}

export default Input;
