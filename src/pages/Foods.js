import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

export default function Foods() {
  const { mealsList } = useContext(RecipesContext);
  const history = useHistory();

  const condition = () => {
    if (mealsList) {
      if (mealsList.length === 1) {
        history.push(`/foods/${mealsList[0].idMeal}`);
      }
      if (mealsList.length > 1) {
        return mealsList.map((meal, index) => (
          <Card key={ index } index={ index } recipe={ meal } />));
      }
      return (<p />);
    }
  };

  return (
    <div className="foods">
      <Header page="Foods" searchbar />
      { condition() }
      <Footer />
    </div>
  );
}
