import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();

  // Pega o email da pessoa no localStorage.
  const userEmail = JSON.parse(localStorage.getItem('user')).email;

  // Função de redirecionamento de página ao clicar no botão
  const redirectBtn = ({ target: { name } }) => {
    if (name === 'done') history.push('/done-recipes');
    else if (name === 'favorite') history.push('/favorite-recipes');
    else if (name === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  };

  return (
    <div className="profile">
      <Header page="Profile" />
      <p data-testid="profile-email">{ userEmail }</p>
      <div>
        <button
          type="button"
          name="done"
          data-testid="profile-done-btn"
          onClick={ redirectBtn }
        >
          Done Recipes
        </button>
      </div>
      <div>
        <button
          type="button"
          name="favorite"
          data-testid="profile-favorite-btn"
          onClick={ redirectBtn }
        >
          Favorite Recipes
        </button>
      </div>
      <div>
        <button
          type="button"
          name="logout"
          data-testid="profile-logout-btn"
          onClick={ redirectBtn }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
