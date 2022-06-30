export const MAX_CATEGORY_LIST_LENGTH = 5;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_RECOMENDATIONS_LENGTH = 6;
export const MAX_LIST_LENGTH = 12;

export const INDEX_PROGRESS_URL = 12;
export const INDEX_PATHNAME = 4;

export const API_FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/';
export const API_COCKTAILS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const assembleDoneRecipe = (recipeInfo, objKey, doneDate) => {
  const doneRecipe = {
    id: recipeInfo[0][`id${objKey}`],
    type: objKey === 'Meal' ? 'food' : 'drink',
    nationality: objKey === 'Meal' ? recipeInfo[0].strArea : '',
    category: recipeInfo[0].strCategory,
    alcoholicOrNot: objKey === 'Drink' ? recipeInfo[0].strAlcoholic : '',
    name: recipeInfo[0][`str${objKey}`],
    image: recipeInfo[0][`str${objKey}Thumb`],
    doneDate,
    tags: recipeInfo[0].strTags,
  };
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
};
