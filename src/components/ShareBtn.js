import React, { useState } from 'react';// { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { INDEX_PROGRESS_URL } from '../helpers/constants';

function ShareBtn({ inProgress }) {
  const [onClipboard, setOnClipboard] = useState(false);
  const history = useHistory();
  const urlEndpoint = history.location.pathname;
  const url = `http://localhost:3000${urlEndpoint}`;
  const urlToClipboard = !inProgress ? url
    : url.substring(url.length - INDEX_PROGRESS_URL, 0);

  // console.log(url.substring(url.length - DOZE, 0));
  const handleClick = () => {
    navigator.clipboard.writeText(urlToClipboard);
    // global.alert('Link copied!');
    setOnClipboard(true);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => handleClick() }
      >
        Compartilhar
      </button>
      {onClipboard && (<p>Link copied!</p>)}
    </div>
  );
}

ShareBtn.defaultProps = {
  inProgress: false,
};

ShareBtn.propTypes = {
  inProgress: PropTypes.bool,
};

export default ShareBtn;
