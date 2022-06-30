import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';

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

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesObj = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesObj);
    setDisplayedRecipes(doneRecipesObj);
  }, []);

  let recipes = <p>{'You haven\'t done any recipes yet'}</p>;

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
        <p>
          <span>Done in: </span>
          <span data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</span>
        </p>
        <p>
          <span>Tags: </span>
          { recipe.tags.splice(0, 2).map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {`${tag}, `}
            </span>
          ))}
        </p>
        <ShareBtn
          dataTestId={ `${index}-horizontal-share-btn` }
          urlToShare={ recipe.type === 'food' ? `http://localhost:3000/foods/${recipe.id}` : `http://localhost:3000/drinks/${recipe.id}` }
        />
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
      <Header page="Done Recipes" />
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
