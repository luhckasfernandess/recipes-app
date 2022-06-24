import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_COCKTAILS_URL, API_FOODS_URL,
  MAX_RECOMENDATIONS_LENGTH } from '../helpers/constants';

function Recomendations({ objKey }) {
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      if (objKey === 'Meal') {
        const cards = await getFoodsFromAPI(API_COCKTAILS_URL, 'search.php?s=', '');
        setRecomendations(cards.slice(0, MAX_RECOMENDATIONS_LENGTH));
        console.log(cards.slice(0, MAX_RECOMENDATIONS_LENGTH));
      }
      if (objKey === 'Drink') {
        const cards = await getFoodsFromAPI(API_FOODS_URL, 'search.php?s=', '');
        setRecomendations(cards.slice(0, MAX_RECOMENDATIONS_LENGTH));
        console.log(cards.slice(0, MAX_RECOMENDATIONS_LENGTH));
      }
    };
    requestApi();
  }, []);

  return (
    recomendations.length === 0 ? <p>Loading . . .</p> : (
      recomendations.map((card, index) => {
        let recipeName;
        if (objKey === 'Meal') {
          recipeName = card.strDrink;
        } else recipeName = card.strMeal;

        return (
          <div
            className="recommendations-card"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              className="recommendations-picture"
              src={ objKey === 'Meal' ? `${card.strDrinkThumb}` : `${card.strMealThumb}` }
              alt={ recipeName }
            />
            <p
              data-testid={ `${index}-recomendation-title` }
            >
              {recipeName}
            </p>
          </div>
        );
      })
    ));
}

Recomendations.defaultProps = {
  objKey: '',
};

Recomendations.propTypes = {
  objKey: PropTypes.string,
};

export default Recomendations;
