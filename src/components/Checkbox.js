import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { INDEX_PATHNAME } from '../helpers/constants';

function Checkbox({ ingredient, measurement, index }) {
  const history = useHistory();

  const [inProgressStorage, setInProgressStorage] = useState({});
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [listedIngredients, setListedIngredients] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const inProgressList = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    console.log(inProgressList);
    setInProgressStorage(inProgressList);
    const getRecipeId = history.location.pathname.replace(/[^0-9]+/g, '');
    setRecipeId(getRecipeId);
    // console.log(history.location.pathname.substring(0, INDEX_PATHNAME));
    if (history.location.pathname.substring(0, INDEX_PATHNAME) === '/foo') {
      setTypeOfRecipe('meals');
    }
    if (history.location.pathname.substring(0, INDEX_PATHNAME) === '/dri') {
      setTypeOfRecipe('cocktails');
    }
  }, [listedIngredients]);

  useEffect(() => {
    console.log(inProgressStorage);
    console.log(typeOfRecipe);
    console.log(recipeId);
    if (recipeId !== '' && inProgressStorage) {
      if (typeOfRecipe === 'meals') {
        console.log(inProgressStorage[recipeId]);
        setListedIngredients(inProgressStorage.meals[recipeId]);
      }
      if (typeOfRecipe === 'cocktails') {
        setListedIngredients(inProgressStorage.cocktails[recipeId]);
      }
    }
  }, []);

  //  const ingredientsList = Object.entries(recipeInfo)
  //   .filter((entry) => entry[1] !== null && entry[1] !== '' && entry[1] !== ' ')
  //   .filter((entry) => entry[0].includes('strIngredient'))
  //   .reduce((acc, curr) => {
  //     acc = [...acc, curr[1]];
  //     return acc;
  //   }, []);

  // // console.log(ingredientsList);...inProgressRecipes,

  // const generateInProgressListItem = () => {
  //   let newItem = {};
  //   if (recipeType === 'Meal') {
  //     newItem = {
  //       [recipeInfo.idMeal]: ingredientsList,
  //     };
  //     return newItem;
  //   }
  //   newItem = {
  //     [recipeInfo.idDrink]: ingredientsList,
  //   };
  //   return newItem;
  // };

  // // console.log(inProgressRecipes);
  // const newItem = generateInProgressListItem();
  // let inProgressRecipesNovo;
  // if (recipeType === 'Meal') {
  //   inProgressRecipesNovo = {
  //     ...inProgressRecipes,
  //     meals: { ...inProgressRecipes.meals, ...newItem } };
  // } else {
  //   inProgressRecipesNovo = {
  //     ...inProgressRecipes,
  //     cocktails: { ...inProgressRecipes.cocktails, ...newItem } };
  // }
  // // console.log(inProgressRecipesNovo);

  // let recipeStarted = false;
  // if (recipeType === 'Meal') {
  //   recipeStarted = Object.keys(inProgressRecipes.meals)
  //     .find((id) => id === recipeInfo.idMeal);
  // } else {
  //   recipeStarted = Object.keys(inProgressRecipes.cocktails)
  //     .find((id) => id === recipeInfo.idDrink);
  // }

  const setNewStorage = (target) => {
    // console.log(inProgressStorage);
    // console.log(typeOfRecipe);
    // console.log(recipeId);
    // console.log(target);
    if (target.checked) {
      const newIngredient = {
        ...inProgressStorage[typeOfRecipe],
        [recipeId]: target.name,
      };
      console.log('arr dos bgl', listedIngredients);
      console.log('obj renovads', newIngredient);
      const newArray = listedIngredients;
      newArray.push(newIngredient);
      console.log(newArray);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
    }
  };

  const handleChange = ({ target }) => {
    setChecked(!checked);
    setNewStorage(target);
    // local -> inProgressRecipes -> meals/cocktails -> id: [ing1, ing2, ...]
  };

  // bloquinho dos console.log anti-quebra
  // console.log(typeOfRecipe);
  // console.log(recipeId);
  // console.log(inProgressStorage);
  console.log(checked);

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
          defaultChecked={ checked }
          onChange={ ({ target }) => handleChange({ target }) }
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
