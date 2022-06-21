import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchbar from './Searchbar';

export default function Header({ page, searchbar }) {
  const [searchInputDisplay, setSearchInputDisplay] = React.useState(false);

  return (
    <>
      <div className="header">
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="link to profile page"
          />
        </Link>
        <h1 data-testid="page-title">{ page }</h1>
        { searchbar
          && (
            <button
              type="button"
              onClick={ () => setSearchInputDisplay(!searchInputDisplay) }
            >
              <img
                src={ searchIcon }
                alt="click to open search"
                data-testid="search-top-btn"
              />
            </button>)}
      </div>
      <div>
        { searchInputDisplay && (<Searchbar />) }
      </div>
    </>
  );
}

Header.defaultProps = {
  searchbar: false,
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  searchbar: PropTypes.bool,
};
