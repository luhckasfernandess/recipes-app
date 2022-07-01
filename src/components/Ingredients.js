import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

function Ingredients({ recipeInfo, inProgress, recipeType, setIngredientsLength }) {
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    let ingredientsList;
    let measurementsList;
    if (recipeInfo.length) {
      ingredientsList = Object.entries(recipeInfo[0])
        .filter((entry) => entry[1] !== null && entry[1] !== '' && entry[1] !== ' ')
        .filter((entry) => entry[0].includes('strIngredient'));
      measurementsList = Object.entries(recipeInfo[0])
        .filter((entry) => entry[1] !== null && entry[1] !== '' && entry[1] !== ' ')
        .filter((entry) => entry[0].includes('strMeasure'));
    }
    setMeasurements(measurementsList);
    setIngredients(ingredientsList);
    setIngredientsLength(ingredientsList.length);
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
        {
          !inProgress ? (
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
          ) : (
            ingredients.map((ingredient, index) => (
              <Checkbox
                key={ `${index}-${ingredient[1]}` }
                id={ recipeInfo[0][`id${recipeType}`] }
                typeOfRecipe={ recipeType === 'Meal' ? 'meals' : 'cocktails' }
                ingredient={ ingredient[1] }
                measurement={ measurements[index][1] }
                index={ index }
              />
            ))
          )
        }
      </div>
    )
  );
}

Ingredients.defaultProps = {
  inProgress: false,
  recipeType: '',
  setIngredientsLength: () => {},
};

Ingredients.propTypes = {
  recipeInfo: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  inProgress: PropTypes.bool,
  recipeType: PropTypes.string,
  setIngredientsLength: PropTypes.func,
};

export default Ingredients;
