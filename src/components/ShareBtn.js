import React, { useState } from 'react';// { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { INDEX_PROGRESS_URL } from '../helpers/constants';
import shareBtnIcon from '../images/shareIcon.svg';

function ShareBtn({ dataTestId, urlToShare, inProgress }) {
  const [onClipboard, setOnClipboard] = useState(false);
  const history = useHistory();
  const urlEndpoint = history.location.pathname;
  const url = `http://localhost:3000${urlEndpoint}`;
  const urlToClipboard = !inProgress ? url
    : url.substring(url.length - INDEX_PROGRESS_URL, 0);

  const handleClick = () => {
    console.log(!urlToShare ? url : urlToShare);
    navigator.clipboard.writeText(!urlToShare ? urlToClipboard : urlToShare);
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
  inProgress: false,
  dataTestId: 'share-btn',
  urlToShare: null,
};

ShareBtn.propTypes = {
  inProgress: PropTypes.bool,
  dataTestId: PropTypes.string,
  urlToShare: PropTypes.string,
};

export default ShareBtn;
