import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Checkbox({ ingredient, measurement, index, id, typeOfRecipe }) {
  const { checkedCheckboxes, setCheckedCheckboxes } = useContext(RecipesContext);

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    // console.log(id);
    // console.log(typeOfRecipe);
    let localStorageObj;
    if (localStorage.getItem('inProgressRecipes')) {
      localStorageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (localStorageObj[typeOfRecipe] && localStorageObj[typeOfRecipe][id]) {
        // console.log('localStorageObj-type-id', localStorageObj[typeOfRecipe][id]
        //   .includes(ingredient));
        setChecked(localStorageObj[typeOfRecipe][id].includes(ingredient));
        setCheckedCheckboxes({
          ...checkedCheckboxes,
          [ingredient]: localStorageObj[typeOfRecipe][id].includes(ingredient),
        });
      }
    }
  }, []);

  // console.log(id, typeOfRecipe);

  const handleChange = () => {
    setChecked(!checked);
    const newCheckedList = {
      ...checkedCheckboxes,
      [ingredient]: !checked,
    };
    setCheckedCheckboxes(newCheckedList);
    // console.log(newCheckedList);
  };

  return (
    <div>
      <label htmlFor={ ingredient } data-testid={ `${index}-ingredient-step` }>
        <input
          id={ ingredient }
          type="checkbox"
          name={ ingredient }
          defaultChecked={ checked }
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
  id: PropTypes.string.isRequired,
  typeOfRecipe: PropTypes.string.isRequired,
};

export default Checkbox;
