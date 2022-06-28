import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipeInfo, inProgress }) {
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    let ingredientsList;
    let measurementsList;
    if (recipeInfo.length > 0) {
      ingredientsList = Object.entries(recipeInfo[0])
        .filter((entry) => entry[1] !== null && entry[1] !== '' && entry[1] !== ' ')
        .filter((entry) => entry[0].includes('strIngredient'));
      measurementsList = Object.entries(recipeInfo[0])
        .filter((entry) => entry[1] !== null && entry[1] !== '' && entry[1] !== ' ')
        .filter((entry) => entry[0].includes('strMeasure'));
    }
    // console.log(inProgress);
    // console.log(ingredientsList);
    // console.log(measurementsList);
    setMeasurements(measurementsList);
    setIngredients(ingredientsList);
  }, [recipeInfo, inProgress]);

  useEffect(() => {
    if (ingredients.length !== measurements.length) {
      const newMeasurement = [`strMeasure${ingredients.length + 1}`, '  '];
      setMeasurements([...measurements, newMeasurement]);
    }
  }, [ingredients, measurements]);

  return (
    ingredients.length !== measurements.length ? <p>loading . . .</p> : (
      <div>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li
              key={ `${index}-${ingredient[1]}` }
              data-testid={
                `${index}-ingredient-${inProgress ? 'step' : 'name-and-measure'}`
              }
            >
              {!inProgress ? `${measurements[index][1]} - ${ingredient[1]}`
                : (
                  <label htmlFor={ ingredient[1] }>
                    <input id={ ingredient[1] } type="checkbox" />
                    {`${measurements[index][1]} - ${ingredient[1]}`}
                  </label>
                )}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

Ingredients.defaultProps = {
  inProgress: false,
};

Ingredients.propTypes = {
  recipeInfo: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  inProgress: PropTypes.bool,
};

export default Ingredients;
