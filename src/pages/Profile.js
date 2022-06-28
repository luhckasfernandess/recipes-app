import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div className="profile">
      <Header page="Profile" />
      <p data-testid="profile-email">email@email.com</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
