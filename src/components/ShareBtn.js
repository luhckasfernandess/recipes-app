import React, { useState } from 'react';// { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareBtnIcon from '../images/shareIcon.svg';

function ShareBtn({ dataTestId, urlToShare }) {
  const [onClipboard, setOnClipboard] = useState(false);
  const history = useHistory();
  const urlEndpoint = history.location.pathname;
  const url = `http://localhost:3000${urlEndpoint}`;

  const handleClick = () => {
    console.log(!urlToShare ? url : urlToShare);
    navigator.clipboard.writeText(!urlToShare ? url : urlToShare);
    // global.alert('Link copied!');
    setOnClipboard(true);
  };

  return (
    <div>
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ () => handleClick() }
        src={ shareBtnIcon }
      >
        <img src={ shareBtnIcon } alt="Share button" />
      </button>
      {onClipboard && (<p>Link copied!</p>)}
    </div>
  );
}

ShareBtn.defaultProps = {
  dataTestId: 'share-btn',
  urlToShare: null,
};

ShareBtn.propTypes = {
  dataTestId: PropTypes.string,
  urlToShare: PropTypes.string,
};

export default ShareBtn;
