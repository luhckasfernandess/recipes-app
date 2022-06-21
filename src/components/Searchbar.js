import React, { useEffect } from 'react';
import getFoodsFromAPI from '../helpers/fetchers';

export default function Searchbar() {
  const [searchInput, setSearchInput] = React.useState('');
  const [radioValue, setRadioValue] = React.useState('filter.php?i=');
  const [mealsList, setMealsList] = React.useState([]);

  useEffect(() => {
    console.log('searchInput', searchInput);
    console.log('radioValue', radioValue);
    console.log('mealsList', mealsList);
  }, [radioValue, searchInput, mealsList]);
  // delete before commit

  const handleChange = ({ target }) => {
    if (target.type === 'radio') return setRadioValue(target.value);
    return setSearchInput(target.value);
  };

  const handleClick = async (radio, text) => {
    if (radio === 'search.php?f=' && text.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const updatedList = await getFoodsFromAPI(radio, text);
    setMealsList(updatedList);
  };

  return (
    <form className="searchbar">
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        onChange={ handleChange }
        value={ searchInput }
      />
      <label htmlFor="radio-ingredient">
        <input
          type="radio"
          name="search-selector"
          id="radio-ingredient"
          value="filter.php?i="
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
        Ingredient
      </label>
      <label htmlFor="radio-name">
        <input
          type="radio"
          name="search-selector"
          id="radio-name"
          value="search.php?s="
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Name
      </label>
      <label htmlFor="radio-first-letter">
        <input
          type="radio"
          name="search-selector"
          id="radio-first-letter"
          value="search.php?f="
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick(radioValue, searchInput) }
      >
        Search
      </button>
    </form>
  );
}
