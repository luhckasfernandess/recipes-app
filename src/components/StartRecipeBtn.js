import React, { useEffect } from 'react';// { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeBtn({ recipeInfo, recipeType }) {
  const history = useHistory();

  let inProgressRecipes;
  if (localStorage.getItem('inProgressRecipes')) {
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  } else {
    inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
  }

  // const thisRecipe = {
  //   id: recipeInfo[`id${recipeType}`] || '',
  //   type: recipeType.toLowerCase() || '',
  //   nationality: recipeInfo.strArea || '',
  //   category: recipeInfo.strCategory || '',
  //   alcoholicOrNot: recipeInfo.strAlcoholic || '  ',
  //   name: recipeInfo[`str${recipeType}`] || '',
  //   image: recipeInfo[`str${recipeType}Thumb`] || '',
  //   doneDate: '',
  //   tags: recipeInfo.strTags === null ? [] : recipeInfo.strTags.split(', '),
  // };

  const ingredientsList = Object.entries(recipeInfo)
    .filter((entry) => entry[1] !== null && entry[1] !== '' && entry[1] !== ' ')
    .filter((entry) => entry[0].includes('strIngredient'))
    .reduce((acc, curr) => {
      acc = [...acc, curr[1]];
      return acc;
    }, []);

  // console.log(ingredientsList);...inProgressRecipes,

  const generateInProgressListItem = () => {
    let newItem = {};
    if (recipeType === 'Meal') {
      newItem = {
        [recipeInfo.idMeal]: ingredientsList,
      };
      return newItem;
    }
    newItem = {
      [recipeInfo.idDrink]: ingredientsList,
    };
    return newItem;
  };

  console.log(inProgressRecipes);
  const newItem = generateInProgressListItem();
  let inProgressRecipesNovo;
  if (recipeType === 'Meal') {
    inProgressRecipesNovo = {
      ...inProgressRecipes,
      meals: { ...inProgressRecipes.meals, ...newItem } };
  } else {
    inProgressRecipesNovo = {
      ...inProgressRecipes,
      cocktails: { ...inProgressRecipes.cocktails, ...newItem } };
  }
  console.log(inProgressRecipesNovo);

  let recipeStarted = false;
  if (recipeType === 'Meal') {
    recipeStarted = Object.keys(inProgressRecipes.meals)
      .find((id) => id === recipeInfo.idMeal);
  } else {
    recipeStarted = Object.keys(inProgressRecipes.cocktails)
      .find((id) => id === recipeInfo.idDrink);
  }

  useEffect(() => {
    // console.log('oi');
    // console.log(inProgressRecipes);
  }, []);

  const handleClick = () => {
    // console.log(`Clicou em ${event.target.innerText}`);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesNovo));
    if (recipeType === 'Meal') {
      history.push(`/foods/${recipeInfo.idMeal}/in-progress`);
    } else history.push(`/drinks/${recipeInfo.idDrink}/in-progress`);
  };

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-recipe-btn"
      onClick={ () => handleClick() }
    >
      {recipeStarted ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

StartRecipeBtn.propTypes = {
  recipeInfo: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default StartRecipeBtn;
