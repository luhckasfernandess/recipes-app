import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { mealsList } = useContext(RecipesContext);
  const history = useHistory();

  const condition = () => {
    if (mealsList) {
      if (mealsList.length === 1) {
        history.push(`/drinks/${mealsList[0].idDrink}`);
      }
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
