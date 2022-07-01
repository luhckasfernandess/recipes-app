import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

// const doneRecipesObj = [{
//   id: '52977',
//   type: 'food',
//   nationality: 'Turkish',
//   category: 'Side',
//   alcoholicOrNot: '',
//   name: 'Corba',
//   image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   doneDate: Date('June 28, 2022 20:51:00'),
//   tags: ['Soup', 'Teste', 'Excluir', 'Excluir também'],
// }];

//   "doneDate":"Date('June 28, 2022 20:51:00')","tags":"['Soup', 'Teste', 'Excluir', 'Excluir também']"

export default function DoneRecipes({ page }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  const storage = page === 'done' ? 'doneRecipes' : 'favoriteRecipes';

  useEffect(() => {
    console.log(page);
    const doneRecipesObj = JSON.parse(localStorage.getItem(storage));
    setDoneRecipes(doneRecipesObj);
    setDisplayedRecipes(doneRecipesObj);
  }, []);

  useEffect(() => {
    const doneRecipesObj = JSON.parse(localStorage.getItem(storage));
    setDoneRecipes(doneRecipesObj);
  }, [displayedRecipes]);

  const handleClick = (recipeId) => {
    console.log(doneRecipes);
    const newDoneRecipes = doneRecipes.filter((recipe) => recipe.id !== recipeId);
    console.log(newDoneRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newDoneRecipes));
    setDisplayedRecipes(newDoneRecipes);
  };

  // const verb = page === 'done' ? 'done' : 'favorited';
  // let recipes = <p>{`You haven't ${verb} any recipes yet`}</p>;
  let recipes = <p>Sorry. Nothing to show here...</p>;

  if (displayedRecipes.length > 0) {
    recipes = displayedRecipes.map((recipe, index) => (
      <div key={ recipe.id }>
        <a href={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
          <img
            src={ recipe.image }
            alt="imagem"
            className="recipe-photo"
            data-testid={ `${index}-horizontal-image` }
          />
        </a>
        {recipe.type === 'food' ? (
          <p>
            <span>Category: </span>
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.nationality} - ${recipe.category}` }
            </span>
          </p>
        )
          : (
            <p>
              <span>Category: </span>
              <span data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.alcoholicOrNot} - ${recipe.category}` }
              </span>
            </p>
          ) }
        { page === 'done' && (
          <>
            <p>
              <span>Done in: </span>
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </span>
            </p>
            { recipe.tags && (
              <p>
                <span>Tags: </span>
                { recipe.tags.map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {`${tag}, `}
                  </span>
                ))}
              </p>
            )}
          </>)}
        <ShareBtn
          dataTestId={ `${index}-horizontal-share-btn` }
          urlToShare={ recipe.type === 'food' ? `http://localhost:3000/foods/${recipe.id}` : `http://localhost:3000/drinks/${recipe.id}` }
        />
        {page === 'fav'
          && (
            <FavoriteBtn
              recipeInfo={ recipe }
              recipeType={ recipe.type }
              short
              index={ index }
              buttonFunction={ () => handleClick(recipe.id) }
            />)}
      </div>
    ));
  }

  const showAll = () => {
    const allRecipes = doneRecipes;
    setDisplayedRecipes(allRecipes);
  };

  const showFoods = () => {
    const foodRecipes = doneRecipes.filter((recipe) => recipe.type === 'food');
    setDisplayedRecipes(foodRecipes);
  };

  const showDrinks = () => {
    const drinkRecipes = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setDisplayedRecipes(drinkRecipes);
  };

  return (
    <div className="done-recipes">
      <Header page={ page === 'done' ? 'Done Recipes' : 'Favorite Recipes' } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ showAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ showFoods }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ showDrinks }
      >
        Drink
      </button>
      {recipes}
    </div>
  );
}

DoneRecipes.propTypes = {
  page: PropTypes.string.isRequired,
};
