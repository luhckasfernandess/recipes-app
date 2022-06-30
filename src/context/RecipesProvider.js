import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [mealsList, setMealsList] = useState([]);
  const [inProgressStorage, setInProgressStorage] = useState({});
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [listedIngredients, setListedIngredients] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState({});

  const contextValue = {
    mealsList,
    setMealsList,
    inProgressStorage,
    setInProgressStorage,
    typeOfRecipe,
    setTypeOfRecipe,
    recipeId,
    setRecipeId,
    listedIngredients,
    setListedIngredients,
    checkedCheckboxes,
    setCheckedCheckboxes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
