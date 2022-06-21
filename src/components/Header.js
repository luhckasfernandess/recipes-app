import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ page }) {
  return (
    <div className="header">
      <Link to="/profile">
        <img
          src="../images/profileIcon.svg"
          data-testid="profile-top-btn"
          alt="link to profile page"
        />
      </Link>
      <h1 data-testid="page-title">{ page }</h1>
      <Link to="/explore">
        <img
          src="../images/searchIcon.svg"
          data-testid="search-top-btn"
          alt="link to explore page"
        />
      </Link>
    </div>
  );
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
};
