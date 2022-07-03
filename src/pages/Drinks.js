import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import { API_COCKTAILS_URL } from '../helpers/constants';
import getFoodsFromAPI from '../helpers/fetchers';
import CategoryMenu from '../components/CategoryMenu';

export default function Drinks() {
  const { mealsList, setMealsList,
    filterByIng, setFilterByIng } = useContext(RecipesContext);
  const history = useHistory();

  const condition = () => {
    if (mealsList) {
      if (mealsList.length === 1) {
        history.push(`/drinks/${mealsList[0].idDrink}`);
      }
      if (mealsList.length > 1) {
        return mealsList.map((meal, index) => (
          <Card key={ index } index={ index } recipe={ meal } page="Drinks" />));
      }
      return (<p />);
    }
  };

  useEffect(() => {
    // console.log('Carregou DRINKS');
    const tag = filterByIng ? 'filter.php?i=' : 'search.php?s=';
    const defaultList = async () => {
      const updatedList = await getFoodsFromAPI(API_COCKTAILS_URL, tag, filterByIng);
      return setMealsList(updatedList) && setFilterByIng('');
    };
    defaultList();
  }, [setMealsList]);

  return (
    <div className="drinks">
      <Header page="Drinks" searchbar />
      <CategoryMenu source={ API_COCKTAILS_URL } />
      { condition() }
      <Footer />
    </div>
  );
}
