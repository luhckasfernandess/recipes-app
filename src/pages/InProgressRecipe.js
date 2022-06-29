import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_FOODS_URL, API_COCKTAILS_URL } from '../helpers/constants';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import Ingredients from '../components/Ingredients';

function InProgressRecipe({ match: { params: { id }, path } }) {
  const [loading, setLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [objKey, setObjKey] = useState('');

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

  return (
    loading ? <p>Loading . . .</p> : (
      <div>
        <img
          alt="imagem da receita"
          src={ recipeInfo[0][`str${objKey}Thumb`] }
          data-testid="recipe-photo"
        />
        <h3 data-testid="recipe-title">{ recipeInfo[0][`str${objKey}`] }</h3>
        <ShareBtn inProgress />
        <FavoriteBtn recipeInfo={ recipeInfo[0] } recipeType={ objKey } />
        <h5 data-testid="recipe-category">{ recipeInfo[0].strCategory }</h5>
        <Ingredients recipeInfo={ recipeInfo } inProgress />
        <p data-testid="instructions">{recipeInfo[0].strInstructions}</p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => console.log('cliquei') }
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
