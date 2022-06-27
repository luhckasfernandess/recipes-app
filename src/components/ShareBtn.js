import React, { useState } from 'react';// { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function ShareBtn() {
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

export default ShareBtn;
