import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_COCKTAILS_URL, API_FOODS_URL } from '../helpers/constants';

function RecipeDetails(props) {
  const { match: { params: { id }, path } } = props;
  const [recipeInfo, setRecipeInfo] = useState([]);
  console.log(recipeInfo);
  useEffect(() => {
    const requestApi = async () => {
      if (path.includes('foods')) {
        const recipe = await getFoodsFromAPI(API_FOODS_URL, 'lookup.php?i=', id);
        setRecipeInfo(recipe);
      } else {
        const recipe = getFoodsFromAPI(API_COCKTAILS_URL, 'lookup.php?i=', id);
        setRecipeInfo(recipe);
      }
    };
    requestApi();
  }, []);

  return (
    <div>
      <p />
      <img data-testid="recipe-photo" src="hh" alt="" />
      <h2 data-testid="recipe-title">Titulo</h2>
      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>

      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button>

      <p data-testid="recipe-category" />

      <ul>
        <li
          data-testid="0-ingredient-name-and-measure"
        >
          Ingredientes
        </li>
      </ul>
      <p data-testid="instructions">texto de instruções</p>

      <video
        width="320"
        height="240"
        controls
        data-testid="video"
      >
        <source
          src="movie.mp4"
          type="video/mp4"

        />
        <track
          default
          kind="captions"
          srcLang="en"
          src="/media/examples/friday.vtt"
        />
        Your browser does not support the video tag.
      </video>
      <div
        data-testid="0-recomendation-card"
      >
        <p data-testid="0-recomendation-title">Titulo</p>
        Card
      </div>
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar
      </button>
    </div>

  );
}
RecipeDetails.defaultProps = {
  params: {},
  id: '',
  path: '',
};
RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  params: PropTypes.shape(),
  id: PropTypes.string,
  path: PropTypes.string,
};

export default RecipeDetails;
