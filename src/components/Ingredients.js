import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ recipeInfo }) {
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
    // console.log(recipeInfo[0]);
    // console.log(ingredientsList);
    // console.log(measurementsList);
    setMeasurements(measurementsList);
    setIngredients(ingredientsList);
  }, [recipeInfo]);

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
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${measurements[index][1]} - ${ingredient[1]}`}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

Ingredients.propTypes = {
  recipeInfo: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Ingredients;
