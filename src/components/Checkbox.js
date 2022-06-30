import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Checkbox({ ingredient, measurement, index, id, typeOfRecipe }) {
  const { checkedCheckboxes, setCheckedCheckboxes } = useContext(RecipesContext);

  const [checked, setChecked] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    // console.log(id);
    // console.log(typeOfRecipe);
    let localStorageObj;
    if (localStorage.getItem('inProgressRecipes')) {
      localStorageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    setApiResponse(localStorageObj);
  }, []);

  useEffect(() => {
    console.log(id, typeOfRecipe);
    console.log(apiResponse);
    localStorage.setItem('inProgressRecipes', JSON.stringify(apiResponse));
  }, [apiResponse]);

  useEffect(() => {
    const newCheckedList = {
      ...checkedCheckboxes,
      [ingredient]: checked,
    };
    setCheckedCheckboxes(newCheckedList);
    console.log(newCheckedList);
  }, [checked]);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <label htmlFor={ ingredient } data-testid={ `${index}-ingredient-step` }>
        <input
          id={ ingredient }
          type="checkbox"
          name={ ingredient }
          defaultChecked={ checked }
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
  id: PropTypes.string.isRequired,
  typeOfRecipe: PropTypes.string.isRequired,
};

export default Checkbox;
