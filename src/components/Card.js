import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, recipe, page }) {
  // console.log('recipe', recipe);
  // console.log('obj-key-0', Object.keys(recipe)[0]);
  let thumb;
  let title;
  console.log(recipe);
  if (recipe.strMeal) {
    thumb = recipe.strMealThumb;
    title = recipe.strMeal;
  }
  if (recipe.strDrink) {
    thumb = recipe.strDrinkThumb;
    title = recipe.strDrink;
  }
  let newURL;
  console.log(page);
  if (page === 'Foods') {
    newURL = `/foods/${recipe.idMeal}`;
  } else newURL = `/drinks/${recipe.idDrink}`;

  return (
    <a href={ newURL }>
      <div
        className="card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ thumb }
          alt="card"
          data-testid={ `${index}-card-img` }
        />
        <h3
          className="card-title"
          data-testid={ `${index}-card-name` }
        >
          { title }
        </h3>
      </div>
    </a>
  );
}

export default Card;

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
  page: PropTypes.string.isRequired,
};
