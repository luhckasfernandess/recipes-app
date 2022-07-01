import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_FOODS_URL, API_COCKTAILS_URL, genNewLocal,
  assembleDoneRecipe, assembleNewObj, handleLocalStorageObj } from '../helpers/constants';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import Ingredients from '../components/Ingredients';

function InProgressRecipe({ match: { params: { id }, path } }) {
  const { checkedCheckboxes, setCheckedCheckboxes } = useContext(RecipesContext);

  const [loading, setLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [objKey, setObjKey] = useState('');
  const [ingredientsLength, setIngredientsLength] = useState(0);

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

  useEffect(() => {
    const localStorageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const type = path.includes('foods') ? 'meals' : 'cocktails';
    genNewLocal(localStorageObj, type, id);
    if (localStorageObj?.[type]?.[id]) {
      const updateBoxesObj = assembleNewObj(localStorageObj[type][id]);
      setCheckedCheckboxes(updateBoxesObj);
    }
  }, []);

  useEffect(() => {
    let localStorageObj;
    if (localStorage.getItem('inProgressRecipes')) {
      localStorageObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
      handleLocalStorageObj(localStorageObj, objKey, id, checkedCheckboxes);
    }
    console.log(checkedCheckboxes);
  }, [checkedCheckboxes]);

  const handleClick = () => {
    history.push('/done-recipes');
    const doneDate = new Date().toLocaleDateString();
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
        <Ingredients
          recipeInfo={ recipeInfo }
          recipeType={ objKey }
          setIngredientsLength={ setIngredientsLength }
          inProgress
        />
        <p data-testid="instructions">{recipeInfo[0].strInstructions}</p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => handleClick() }
          disabled={ ingredientsLength !== Object
            .values(checkedCheckboxes).filter((i) => i).length }
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
