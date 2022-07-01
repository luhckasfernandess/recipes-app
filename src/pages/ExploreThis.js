import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreThis() {
  const history = useHistory();

  const [type, setType] = useState('');

  useEffect(() => {
    if (history.location.pathname.includes('foods')) {
      return setType('foods');
    }
    return setType('drinks');
  }, []);

  const handleClick = (where) => {
    switch (where) {
    case 'ingredients':
      return history.push(`/explore/${type}/ingredients`);
    case 'nationalities':
      return history.push(`/explore/${type}/nationalities`);
    default:
      return console.log(type);
    }
  };

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
      <div className="explore-by-ingredient" data-testid="explore-surprise">
        <button
          type="button"
          onClick={ () => handleClick() }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}
