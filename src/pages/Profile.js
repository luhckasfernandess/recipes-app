import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  return (
    <div className="profile">
      <Header page="Profile" />
      <p data-testid="profile-email">{ userEmail }</p>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
