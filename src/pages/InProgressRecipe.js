import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_FOODS_URL, API_COCKTAILS_URL,
  assembleDoneRecipe } from '../helpers/constants';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import Ingredients from '../components/Ingredients';

function InProgressRecipe({ match: { params: { id }, path } }) {
  const { checkedCheckboxes } = useContext(RecipesContext);

  const [loading, setLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [objKey, setObjKey] = useState('');

  const history = useHistory();

  useEffect(() => {
    const requestApi = async () => {
      if (path.includes('foods')) {
        setObjKey('Meal');
        const recipe = await getFoodsFromAPI(API_FOODS_URL, 'lookup.php?i=', id);
        setRecipeInfo(recipe);
        setLoading(false);
      } else {
        setObjKey('Drink');
        const recipe = await getFoodsFromAPI(API_COCKTAILS_URL, 'lookup.php?i=', id);
        setRecipeInfo(recipe);
        setLoading(false);
      }
    };
    requestApi();
  }, []);

  const handleLocalStorageObj = (storeObj) => {
    let newObj;
    const updatedIngredients = Object.keys(checkedCheckboxes)
      .filter((ingr) => checkedCheckboxes[ingr]);
    if (objKey === 'Meal') {
      newObj = {
        ...storeObj,
        meals: { ...storeObj.meals,
          [id]: [...storeObj.meals[id], updatedIngredients],
        },
      };
      console.log('newObj', newObj);
      return localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
    if (objKey === 'Drink') {
      newObj = {
        ...storeObj,
        cocktails: { ...storeObj.cocktails,
          [id]: [...storeObj.cocktails[id], updatedIngredients],
        },
      };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
  };

  useEffect(() => {
    let localStorageObj;
    if (localStorage.getItem('inProgressRecipes')) {
      localStorageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    handleLocalStorageObj(localStorageObj);
  }, [checkedCheckboxes]);

  const handleClick = () => {
    history.push('/done-recipes');
    const doneDate = new Date().toLocaleDateString();
    console.log('doneDate', doneDate);
    assembleDoneRecipe(recipeInfo, objKey, doneDate);
  };

  return (
    loading ? <p>Loading . . .</p> : (
      <div>
        <img
          alt="imagem da receita"
          src={ recipeInfo[0][`str${objKey}Thumb`] }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <h3 data-testid="recipe-title">{ recipeInfo[0][`str${objKey}`] }</h3>
        <ShareBtn inProgress />
        <FavoriteBtn recipeInfo={ recipeInfo[0] } recipeType={ objKey } />
        <h5 data-testid="recipe-category">{ recipeInfo[0].strCategory }</h5>
        <Ingredients recipeInfo={ recipeInfo } recipeType={ objKey } inProgress />
        <p data-testid="instructions">{recipeInfo[0].strInstructions}</p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => handleClick() }
          disabled={ !Object.values(checkedCheckboxes).every((box) => box === true) }
        >
          Finish Recipe
        </button>
      </div>
    ));
}

InProgressRecipe.defaultProps = {
  params: {},
  id: '',
  path: '',
};

InProgressRecipe.propTypes = {
  match: PropTypes.shape().isRequired,
  params: PropTypes.shape(),
  id: PropTypes.string,
  path: PropTypes.string,
};

export default InProgressRecipe;
