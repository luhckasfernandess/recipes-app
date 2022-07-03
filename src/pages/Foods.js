import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import { API_FOODS_URL } from '../helpers/constants';
import getFoodsFromAPI from '../helpers/fetchers';
import CategoryMenu from '../components/CategoryMenu';

export default function Foods() {
  const { mealsList, setMealsList,
    filterByIng, setFilterByIng } = useContext(RecipesContext);
  const condition = () => {
    if (mealsList) {
      return mealsList.map((meal, index) => (
        <Card key={ index } index={ index } recipe={ meal } page="Foods" />));
    } return (<p />);
  };

  useEffect(() => {
    // console.log('Carregou FOODS');
    const defaultList = async () => {
      const tag = filterByIng ? 'filter.php?i=' : 'search.php?s=';
      const updatedList = await getFoodsFromAPI(API_FOODS_URL, tag, filterByIng);
      setMealsList(updatedList);
      setFilterByIng('');
    };
    defaultList();
  }, [setMealsList]);

  return (
    <div className="foods">
      <Header page="Foods" searchbar />
      <CategoryMenu source={ API_FOODS_URL } />
      { condition() }
      <Footer />
    </div>
  );
}
