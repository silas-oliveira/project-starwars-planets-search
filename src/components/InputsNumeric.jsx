import React, { useContext, useState } from 'react';
import STARSContext from '../context/STARSContext';

function InputsNumeric() {
  const INITIAL_STATE = {
    column: '',
    comparison: '',
    value: '',
  };

  const INITIAL_COLUMNS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const INITIAL_CORRECT_COLUMN = [
    '',
  ];

  const [inputNumeric, setInputNumeric] = useState(INITIAL_STATE);
  const { addFilterNumeric, filters, removeFilterNumeric } = useContext(STARSContext);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [correctColumn, setCorrectColumn] = useState(INITIAL_CORRECT_COLUMN);

  console.log(correctColumn);

  const { filterByNumericValues } = filters;

  function handleChange({ target }) {
    const { name, value } = target;

    setInputNumeric({ ...inputNumeric, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { column } = inputNumeric;

    if (column !== '') {
      const arrayColumns = columns.filter((select) => select !== column);
      const selectCorrect = columns.filter((select) => select === column);

      setInputNumeric(INITIAL_STATE);

      setCorrectColumn(selectCorrect);
      setColumns(arrayColumns);
      addFilterNumeric(inputNumeric);
    }
  }

  function handleClick({ target }) {
    const { name } = target;

    removeFilterNumeric(name);
    setColumns([...columns, name]);
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <select
          required
          value={ inputNumeric.column }
          onChange={ handleChange }
          data-testid="column-filter"
          name="column"
        >
          { columns.map((option, index) => (
            <option key={ index } value={ option }>{ option }</option>
          )) }
        </select>
        <select
          required
          value={ inputNumeric.comparison }
          onChange={ handleChange }
          data-testid="comparison-filter"
          name="comparison"
        >
          <option hidden disabled value="">select</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          required
          value={ inputNumeric.value }
          onChange={ handleChange }
          type="number"
          name="value"
          data-testid="value-filter"
        />
        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
      { filterByNumericValues.reduce((acc, current, index) => {
        const columnsCorrects = (
          <div data-testid="filter" key={ index }>
            <span>{`${current.column} ${current.comparison} ${current.value}`}</span>
            <button
              name={ current.column }
              onClick={ handleClick }
              type="button"
            >
              X
            </button>
          </div>);
        acc.push(columnsCorrects);
        return acc;
      }, []) }
    </div>
  );
}

export default InputsNumeric;
