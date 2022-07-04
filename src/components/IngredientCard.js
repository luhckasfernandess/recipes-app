import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function IngredientCard({ index, ingredient, type }) {
  const history = useHistory();

  const { setFilterByIng } = useContext(RecipesContext);

  const [ingName, setIngName] = useState('');
  const [ingImage, setIngImage] = useState('');

  useEffect(() => {
    const name = Object.keys(ingredient)
      .filter((key) => key.includes('strIngredient'));
    setIngName(ingredient[name]);
    const fo = 'https://www.themealdb.com/images/ingredients/';
    const dr = 'https://www.thecocktaildb.com/images/ingredients/';
    const imageUrl = type === 'foods' ? fo : dr;
    setIngImage(`${imageUrl}${ingredient[name]}-Small.png`);
  }, []);

  const handleClick = () => {
    setFilterByIng(ingName);
    return history.push(`/${type}`);
  };

  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      onClick={ handleClick }
      aria-hidden="true"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ ingImage }
        alt={ ingName }
      />
      <p data-testid={ `${index}-card-name` }>{ ingName }</p>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
};
