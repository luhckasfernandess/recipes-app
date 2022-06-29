import React, { useState } from 'react';// { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ShareBtn({ dataTestId }) {
  const [onClipboard, setOnClipboard] = useState(false);
  const history = useHistory();
  const urlEndpoint = history.location.pathname;
  const url = `http://localhost:3000${urlEndpoint}`;

  console.log(url);

  const handleClick = () => {
    navigator.clipboard.writeText(url);
    // global.alert('Link copied!');
    setOnClipboard(true);
  };

  return (
    <div>
      <button
        data-testid={ dataTestId }
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
  dataTestId: 'share-btn',
};

ShareBtn.propTypes = {
  dataTestId: PropTypes.string,
};

export default ShareBtn;
