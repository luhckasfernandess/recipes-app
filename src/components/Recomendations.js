import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_COCKTAILS_URL, API_FOODS_URL,
  MAX_RECOMENDATIONS_LENGTH } from '../helpers/constants';
import '../helpers/style.css';

function Recomendations({ objKey }) {
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      if (objKey === 'Meal') {
        const cards = await getFoodsFromAPI(API_COCKTAILS_URL, 'search.php?s=', '');
        setRecomendations(cards.slice(0, MAX_RECOMENDATIONS_LENGTH));
      }
      if (objKey === 'Drink') {
        const cards = await getFoodsFromAPI(API_FOODS_URL, 'search.php?s=', '');
        setRecomendations(cards.slice(0, MAX_RECOMENDATIONS_LENGTH));
      }
    };
    requestApi();
  }, []);

  return (
    recomendations.length === 0 ? <p>Loading . . .</p> : (
      recomendations.map((card, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          onClick={ () => console.log('cliquei na DIV') }
          aria-hidden="true"
          role="button"
          className="recomendation-card"
        >
          <img
            src={ objKey === 'Meal' ? `${card.strDrinkThumb}` : `${card.strMealThumb}` }
            alt="mojito"
            hidden
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            { objKey === 'Meal' ? `${card.strDrink}` : `${card.strMeal}` }
          </p>
        </div>
      ))
    ));
}

Recomendations.defaultProps = {
  objKey: '',
};

Recomendations.propTypes = {
  objKey: PropTypes.string,
};

export default Recomendations;
