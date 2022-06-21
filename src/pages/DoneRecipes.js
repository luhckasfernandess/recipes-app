import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div className="done-recipes">
      <Header page="Done Recipes" searchbar={ false } />
    </div>
  );
}
