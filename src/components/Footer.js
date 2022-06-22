import React from 'react';
// import { useHistory } from 'react-router-dom';
import '../helpers/style.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      Explore receitas:
      <br />
      <a href="/drinks">
        <img
          src={ drinkIcon }
          alt="Navegar para Drinks"
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a href="/explore">
        <img
          src={ exploreIcon }
          alt="Navegar para Explore"
          data-testid="explore-bottom-btn"
        />
      </a>
      <a href="/foods">
        <img
          src={ mealIcon }
          alt="Navegar para Foods"
          data-testid="food-bottom-btn"
        />
      </a>
    </footer>
  );
}
