import React from 'react';

export default function Searchbar() {
  return (
    <form className="searchbar">
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
      />
      <label htmlFor="radio-ingredient">
        <input
          type="radio"
          name="search-selector"
          id="radio-ingredient"
          value="Ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="radio-name">
        <input
          type="radio"
          name="search-selector"
          id="radio-name"
          value="Name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="radio-first-letter">
        <input
          type="radio"
          name="search-selector"
          id="radio-first-letter"
          value="First Letter"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => console.log('cliquei') }
      >
        Search
      </button>
    </form>
  );
}
