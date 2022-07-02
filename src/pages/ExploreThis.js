import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { API_FOODS_URL, API_COCKTAILS_URL } from '../helpers/constants';
import getFoodsFromAPI from '../helpers/fetchers';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreThis() {
  const history = useHistory();

  const [type, setType] = useState('');
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const typeee = history.location.pathname.includes('foods') ? 'foods' : 'drinks';
      setType(typeee);
      const endpoint = typeee === 'foods' ? API_FOODS_URL : API_COCKTAILS_URL;
      const idByType = typeee === 'drinks' ? 'idDrink' : 'idMeal';
      const apiResponse = await getFoodsFromAPI(endpoint, 'random.php', '');
      console.log(apiResponse[0]);
      setRandomId(apiResponse[0][idByType]);
    };
    fetchApi();
  }, []);

  return (
    <div className={ `explore-${type}` }>
      <Header page={ `Explore ${type === 'foods' ? 'Foods' : 'Drinks'}` } />
      <Link to={ `/explore/${type}/ingredients` }>
        <div className="explore-by-ingredient" data-testid="explore-by-ingredient">
          <p>
            By Ingredient
          </p>
        </div>
      </Link>
      {type === 'foods'
        && (
          <Link to={ `/explore/${type}/nationalities` }>
            <div className="explore-by-ingredient" data-testid="explore-by-nationality">
              <p>
                By Nationality
              </p>
            </div>
          </Link>
        )}
      <Link to={ `/${type}/${randomId}` }>
        <div className="explore-by-ingredient" data-testid="explore-surprise">
          <p>
            Surprise me!
          </p>
        </div>
      </Link>
      <Footer />
    </div>
  );
}
