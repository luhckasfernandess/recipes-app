import React, { useContext } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { mealsList } = useContext(RecipesContext);

  const condition = () => {
    // console.log('mealsList', mealsList);
    // if (mealsList.length === 1) {
    //   return ();
    // }
    if (mealsList) {
      if (mealsList.length > 1) {
        return mealsList.map((meal, index) => (
          <Card key={ index } index={ index } recipe={ meal } />));
      }
      return (<p />);
    }
  };

  return (
    <div className="drinks">
      <Header page="Drinks" searchbar />
      { condition() }
    </div>
  );
}
