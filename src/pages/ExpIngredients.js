import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getFoodsFromAPI from '../helpers/fetchers';
import { API_FOODS_URL, API_COCKTAILS_URL } from '../helpers/constants';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';

export default function ExpIngredients() {
  const history = useHistory();

  const [type, setType] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const typeee = history.location.pathname.includes('foods') ? 'foods' : 'drinks';
      setType(typeee);
      const endpoint = typeee === 'foods' ? API_FOODS_URL : API_COCKTAILS_URL;
      const apiResponse = await getFoodsFromAPI(endpoint, 'list.php?i=', 'list');
      // console.log(apiResponse);
      setIngredients(apiResponse);
    };
    fetchApi();
  }, []);

  return (
    <div className={ `exp-${type}-ing` }>
      <Header page="Explore Ingredients" />
      { ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ `${index}-${ingredient}` }
          index={ index }
          ingredient={ ingredient }
          type={ type }
        />
      )) }
      <Footer />
    </div>
  );
}
