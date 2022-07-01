import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();

  return (
    <div className="explore">
      <Header page="Explore" />
      <button
        type="button"
        onClick={ () => history.push('/explore/foods') }
        data-testid="explore-foods"
      >
        Explore Foods
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore/drinks') }
        data-testid="explore-drinks"
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}
