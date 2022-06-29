import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Checkbox({ ingredient, measurement, index }) {
  const [checked, setChecked] = useState(true);
  // console.log(measurement);

  const handleChange = () => {
    console.log(checked);
    setChecked(!checked);
  };

  return (
    <div>
      <label
        htmlFor={ ingredient }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          id={ ingredient }
          type="checkbox"
          name={ ingredient }
          checked={ checked }
          onChange={ () => handleChange() }
        />
        {` ${measurement} - ${ingredient}`}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  measurement: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Checkbox;
